const express= require("express");
const path= require("path");
const fs=require("fs");
const sass=require("sass");
const sharp=require("sharp");
const pg = require("pg");
const app= express();
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));



const obGlobal={
    obErori:null,
    obImagini:null,
    folderScss: path.join(__dirname,"resurse/scss"),
    folderCss: path.join(__dirname,"resurse/css"),
    folderBackup: path.join(__dirname,"backup"),
}

client=new pg.Client({
    database:"cti_2026",
    user:"ciprian",
    password:"ciprian",
    host:"localhost",
    port:5432
})

client.connect()

// Extragem o singura data categoriile pentru a genera meniul dinamic
client.query("select * from unnest(enum_range(null::categorie_produs))", function(err, rez){
    if (err){
        console.log("Eroare la extragere categorii", err);
        console.log("Eroare extragere enum:", err.message);
        console.log("-> Se încearcă extragerea direct din tabel...");
        client.query("SELECT DISTINCT categorie AS unnest FROM produse", function(err2, rez2){
            if (err2) {
                console.log("Eroare și la preluarea din tabel:", err2.message);
            } else {
                app.locals.optiuniMeniu = rez2.rows;
            }
        });
    }else{
        app.locals.optiuniMeniu = rez.rows;
    }
})


console.log("Folder index.js", __dirname);
console.log("Folder curent (de lucru)", process.cwd());
console.log("Cale cale_imagine", __filename);

let vect_foldere=[ "temp", "logs", "backup", "fisiere_uploadate" ]
for (let folder of vect_foldere){
    let caleFolder=path.join(__dirname, folder);
    if (!fs.existsSync(caleFolder)) {
        fs.mkdirSync(path.join(caleFolder), {recursive:true});   
    }
}

app.use("/resurse",express.static(path.join(__dirname, "resurse")));
app.use("/dist",express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname,"resurse/imagini/favicon/favicon.ico"))
});

app.get(["/", "/index","/home"], function(req, res){
    let sfertCurent = (Math.floor(new Date().getMinutes() / 15) + 1).toString(); // "1", "2", "3" sau "4"
    
   
    let imaginiFiltrate = obGlobal.obImagini.imagini.filter(imag => imag.sfert_ora === sfertCurent);
    
   
    if (imaginiFiltrate.length > 10) {
        imaginiFiltrate = imaginiFiltrate.slice(0, 10);
    }
    
    res.render("pagini/index", {
        ip: req.ip,
        imagini : imaginiFiltrate
    });
});


// app.get("/produse", function(req, res){
//     let sql = "select * from produse";
//     let parametri = [];
//     if (req.query.tip) {
//         sql += " where categorie=$1";
//         parametri.push(req.query.tip);
//     }
//     client.query(sql, parametri, function(err, rez){
//         if (err){
//             console.log("Eroare la interogare", err)
//             console.log("Eroare la interogare produse:", err.message)
//             afisareEroare(res,2)
//         }
//         else{
//             res.render("pagini/produse",{
//                 produse:rez.rows
//             })
//         }
//     })
// })

app.get("/produse", function(req, res){
    let sql = "select * from produse";
    let parametri = [];
    if (req.query.tip) {
        sql += " where categorie=$1";
        parametri.push(req.query.tip);
    }

    // 1. Cerem produsele (cu sau fără filtru de categorie)
    client.query(sql, parametri, function(err, rezProduse){
        if (err){
            console.log("Eroare la interogare produse:", err.message);
            return afisareEroare(res, 2);
        }

        // 2. Cerem valorile minime/maxime (pentru preț, nume, descriere și numărul de produse profesionale)
        let sqlStats = `SELECT MIN(pret) as min_pret, MAX(pret) as max_pret, MAX(LENGTH(nume)) as max_nume, MAX(LENGTH(descriere)) as max_desc, COUNT(*) FILTER (WHERE este_profesional = true) as nr_prof FROM produse`;
        client.query(sqlStats, [], function(err, rezStats){
            if (err) { console.log("Eroare stats:", err.message); return afisareEroare(res, 2); }

            // 3. Cerem materialele unice
            client.query("SELECT DISTINCT material FROM produse WHERE material IS NOT NULL", [], function(err, rezMateriale){
                if (err) { console.log("Eroare materiale:", err.message); return afisareEroare(res, 2); }

                // 4. Cerem tipurile de alimentare unice
                client.query("SELECT DISTINCT tip_alimentare FROM produse WHERE tip_alimentare IS NOT NULL", [], function(err, rezAlimentari){
                    if (err) { console.log("Eroare alimentari:", err.message); return afisareEroare(res, 2); }

                    // 5. Cerem garanțiile unice
                    client.query("SELECT DISTINCT perioada_garantie FROM produse ORDER BY perioada_garantie", [], function(err, rezGarantii){
                        if (err) { console.log("Eroare garantii:", err.message); return afisareEroare(res, 2); }

                        // 6. Cerem categoriile din ENUM
                        client.query("SELECT unnest(enum_range(NULL::categorie_produs)) as unnest", [], function(err, rezCategorii){
                            if (err) { console.log("Eroare categorii:", err.message); return afisareEroare(res, 2); }

                            // TOATE CERERILE AU FOST FINALIZATE CU SUCCES!
                            // Trimitem datele către EJS
                            let stats = rezStats.rows[0]; // Extragem primul (și singurul) rând cu statistici

                            res.render("pagini/produse", {
                                produse: rezProduse.rows,
                                minPret: Math.floor(stats.min_pret || 0),
                                maxPret: Math.ceil(stats.max_pret || 20000),
                                maxNumeLen: stats.max_nume || 100,
                                maxDescLen: stats.max_desc || 500,
                                nrProfesionale: stats.nr_prof || 0,
                                materiale: rezMateriale.rows,
                                alimentari: rezAlimentari.rows,
                                garantii: rezGarantii.rows,
                                optiuniMeniu: rezCategorii.rows
                            });
                        }); // final callback 6
                    }); // final callback 5
                }); // final callback 4
            }); // final callback 3
        }); // final callback 2
    }); // final callback 1
});

app.get("/produs/:id",function(req, res){
    client.query(`select * from produse where id=$1`, [req.params.id], function(err, rez){
        if (err){
            console.log("Eroare la interogare", err);
            console.log("Eroare la interogare produs unic:", err.message);
            afisareEroare(res,404, "Produs inexistent");
        }else{
            res.render("pagini/produs",{
                prod: rez.rows[0],
            })

        }

        })
    });

app.get("/despre", function(req, res){
    res.render("pagini/despre");
});

app.get("/galerie", function(req, res){
    let sfertCurent = (Math.floor(new Date().getMinutes() / 15) + 1).toString();
    
    let imaginiFiltrate = obGlobal.obImagini.imagini.filter(imag => imag.sfert_ora === sfertCurent);
    if (imaginiFiltrate.length > 10) {
        imaginiFiltrate = imaginiFiltrate.slice(0, 10);
    }

    res.render("pagini/galerie", {
        imagini : imaginiFiltrate
    });
});

// app.get("*/galerie-animata.css",function(req, res){

//     var sirScss=fs.readFileSync(path.join(__dirname,"resurse/scss_ejs/galerie_animata.scss")).toString("utf8");
//     var culori=["navy","black","purple","grey"];
//     var indiceAleator=Math.floor(Math.random()*culori.length);
//     var culoareAleatoare=culori[indiceAleator]; 
//     rezScss=ejs.render(sirScss,{culoare:culoareAleatoare});
//     console.log(rezScss);
//     var caleScss=path.join(__dirname,"temp/galerie_animata.scss")
//     fs.writeFileSync(caleScss,rezScss);
//     try {
//         rezCompilare=sass.compile(caleScss,{sourceMap:true});
        
//         var caleCss=path.join(__dirname,"temp/galerie_animata.css");
//         fs.writeFileSync(caleCss,rezCompilare.css);
//         res.setHeader("Content-Type","text/css");
//         res.sendFile(caleCss);
//     }
//     catch (err){
//         console.log(err);
//         res.send("Eroare");
//     }
// });

// app.get("*/galerie-animata.css.map",function(req, res){
//     res.sendFile(path.join(__dirname,"temp/galerie-animata.css.map"));
// });


function initErori(){
    let continut = fs.readFileSync(path.join(__dirname,"resurse/json/erori.json")).toString("utf-8");
    let erori=obGlobal.obErori=JSON.parse(continut)
    let err_default=erori.eroare_default
    err_default.imagine= erori.cale_baza + "/" + err_default.imagine;
    for (let eroare of erori.info_erori){
        eroare.imagine= erori.cale_baza + "/" + eroare.imagine;
    }

}
initErori()


function afisareEroare(res, identificator, titlu, text, imagine){
    //TO DO cautam eroarea dupa identificator
    let eroare= obGlobal.obErori.info_erori.find((elem) => 
        elem.identificator == identificator
    )
    //daca sunt setate titlu, text, imagine, le folosim, 
    //altfel folosim cele din cale_imagineul json pentru eroarea gasita
    //daca nu o gasim, afisam eroarea default
    let errDefault= obGlobal.obErori.eroare_default;
    if(eroare?.status)
        res.status(eroare.identificator)
   
    console.log("Calea imaginii de eroare este:", imagine || eroare?.imagine || errDefault.imagine); // debugging
    
    res.render("pagini/eroare",{
        imagine: imagine || eroare?.imagine || errDefault.imagine,
        titlu: titlu || eroare?.titlu || errDefault.titlu,
        text: text || eroare?.text || errDefault.text,
    });

}


app.get("/eroare", function(req, res){
    afisareEroare(res,404, "Titlu!!!")
});


function initImagini(){
    var continut= fs.readFileSync(path.join(__dirname,"resurse/json/galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;
    let caleGalerie=obGlobal.obImagini.cale_galerie

    let caleAbs=path.join(__dirname,caleGalerie);
    let caleAbsMediu=path.join(caleAbs, "mediu");
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);
        
    let caleAbsMic=path.join(caleAbs, "mic");
    if (!fs.existsSync(caleAbsMic))
        fs.mkdirSync(caleAbsMic);
    
    for (let imag of vImagini){
        let [numeFis, ext]=imag.cale_imagine.split("."); //"ceva.png" -> ["ceva", "png"]
        let caleFisAbs=path.join(caleAbs,imag.cale_imagine);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        let caleFisMicAbs=path.join(caleAbsMic, numeFis+".webp");
        
        if(!fs.existsSync(caleFisMediuAbs)){
            sharp(caleFisAbs).resize(400).toFile(caleFisMediuAbs).catch(err => console.error("Eroare sharp mediu:", err));
        }
        if(!fs.existsSync(caleFisMicAbs)){
            sharp(caleFisAbs).resize(200).toFile(caleFisMicAbs).catch(err => console.error("Eroare sharp mic:", err));
        }
        imag.cale_imagine_mediu="/" + caleGalerie + "mediu/" + numeFis+".webp";
        imag.cale_imagine_mic="/" + caleGalerie + "mic/" + numeFis+".webp";
        imag.cale_imagine="/" + caleGalerie + imag.cale_imagine;
        
    }
    // console.log(obGlobal.obImagini)
}
initImagini();


function compileazaScss(caleScss, caleCss){
    if(!caleCss){

        let numeFisExt=path.basename(caleScss); // "folder1/folder2/a.scss" -> "a.scss"
        let numeFis=numeFisExt.split(".")[0]   /// "a.scss"  -> ["a","scss"]
        caleCss=numeFis+".css"; // output: a.css
    }
    
    if (!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss )
    if (!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss )
    
    let caleBackup=path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup)) {
        fs.mkdirSync(caleBackup,{recursive:true})
    }
    
    // la acest punct avem cai absolute in caleScss si  caleCss

    let numeFisCss=path.basename(caleCss);
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css",numeFisCss ))
    }
    rez=sass.compile(caleScss, {"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    
}


//la pornirea serverului
let vfisiere=fs.readdirSync(obGlobal.folderScss);
for( let numeFis of vfisiere ){
    if (path.extname(numeFis)==".scss"){
        compileazaScss(numeFis);
    }
}


fs.watch(obGlobal.folderScss, function(eveniment, numeFis){
    if (eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss, numeFis);
        if (fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})
 

app.get("/*pagina", function(req, res){
    console.log("Cale pagina", req.url);
    if (req.url.startsWith("/resurse") && path.extname(req.url)==""){
        afisareEroare(res,403);
        return;
    }
    if (path.extname(req.url)==".ejs"){
        afisareEroare(res,400);
        return;
    }
    try{
        res.render("pagini"+req.url, function(err, rezRandare){
            if (err){
                if (err.message.includes("Failed to lookup view")){
                    afisareEroare(res,404)
                }
                else{
                    afisareEroare(res);
                }
            }
            else{
                res.send(rezRandare);
                //console.log("Rezultat randare", rezRandare);
            }
        });
    }
    catch(err){
        if (err.message.includes("Cannot find module")){
            afisareEroare(res,404)
        }
        else{
            afisareEroare(res);
        }
    }
});


app.listen(8080);
console.log("Serverul a pornit!");