window.onload = function() {

    // ==========================================
    // BONUS 4: FILTRARE AUTOMATĂ (ONCHANGE/ONINPUT)
    // ==========================================
    
    // Folosim addEventListener pentru a nu suprascrie funcția de validare deja existentă pe descriere
    document.getElementById("inp-nume").addEventListener("input", aplicaFiltrare);
    document.getElementById("inp-descriere").addEventListener("input", aplicaFiltrare);
    document.getElementById("inp-material").addEventListener("input", aplicaFiltrare);

    // Pentru Select-uri, Checkbox, Range și Radio
    document.getElementById("inp-categorie").addEventListener("change", aplicaFiltrare);
    document.getElementById("inp-alimentare").addEventListener("change", aplicaFiltrare);
    document.getElementById("inp-profesional").addEventListener("change", aplicaFiltrare);
    
    document.getElementById("inp-pret-min").addEventListener("input", aplicaFiltrare);
    document.getElementById("inp-pret-max").addEventListener("input", aplicaFiltrare);

    let radiouri = document.getElementsByName("gr_rad");
    for (let rad of radiouri) {
        rad.addEventListener("change", aplicaFiltrare);
    }

    function eliminaDiacritice(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } // ăpârăț pentru test

    // mesaj pentru filtrare fara produse
    let sectiuneProduse = document.getElementById("produse");
    let mesajFaraProduse = document.createElement("div");
    mesajFaraProduse.id = "mesaj-fara-produse";
    mesajFaraProduse.innerHTML = "Nu există produse conform filtrării curente.";
    
    let gridDiv = document.querySelector(".grid-produse");
    sectiuneProduse.insertBefore(mesajFaraProduse, gridDiv);

    // ==========================================
    // 1. FUNCȚIILE DE PAGINARE (DECLARATE PRIMELE)
    // ==========================================
    const K = 6; // Numărul fix de produse pe o pagină

    function actualizeazaPaginare(produseVizibile) {
        let container = document.getElementById("container-paginare");
        if (!container) {
            container = document.createElement("div");
            container.id = "container-paginare"; // SCSS-ul va stiliza automat pe baza acestui ID
            let grid = document.querySelector(".grid-produse");
            grid.parentElement.insertBefore(container, grid);
        }

        container.innerHTML = ""; 
        let N = produseVizibile.length;

        let contorProduse = document.getElementById("contor-produse");
        if(contorProduse) {
            contorProduse.innerHTML = N;
        }

        if (N === 0) return; 

        let NRL = Math.ceil(N / K);

        for (let i = 1; i <= NRL; i++) {
            let btn = document.createElement("button");
            btn.innerHTML = i;
            btn.className = "btn-pagina"; // SCSS-ul va stiliza automat pe baza acestei clase

            btn.onclick = function() {
                let toateBtn = container.getElementsByClassName("btn-pagina");
                for(let b of toateBtn) {
                    b.classList.remove("active");
                }
                btn.classList.add("active");
                
                afiseazaPagina(i, produseVizibile);
            };
            container.appendChild(btn);
        }

        afiseazaPagina(1, produseVizibile);
        if(container.firstChild) container.firstChild.classList.add("active");
    }

    function afiseazaPagina(P, produseVizibile) {
        // 1. Ascundem temporar toate produsele vizibile
        for (let prod of produseVizibile) {
            prod.style.display = "none";
        }

        // 2. Calculăm capetele intervalului
        let start = (P - 1) * K;
        let end = P * K - 1;

        // 3. Afișăm doar produsele din acel interval
        for (let i = start; i <= end && i < produseVizibile.length; i++) {
            produseVizibile[i].style.display = "flex"; // Folosesc flex în loc de block pt designul tău
        }
    }


    // ==========================================
    // 2. INIȚIALIZARE DATE PAGINĂ
    // ==========================================
    let toateProduseleInit = document.getElementsByClassName("produs");
    for (let prod of toateProduseleInit) {
        prod.dataset.treceFiltru = "true"; 
    }
    
    // Apelăm paginarea abia acum, DUPĂ ce a fost declarată funcția
    let toateProdusele = Array.from(toateProduseleInit);
    actualizeazaPaginare(toateProdusele);


    // ==========================================
    // 3. ACTUALIZARE RANGE-URI ÎN TIMP REAL
    // ==========================================
    document.getElementById("inp-pret-min").onchange=function(){
        let val=this.value.trim()
        document.getElementById("infoRangeMin").innerHTML=`(${val})`
    }
    document.getElementById("inp-pret-max").onchange=function(){
        let val=this.value.trim()
        document.getElementById("infoRangeMax").innerHTML=`(${val})`
    }
    
    // Corectare automată validare textarea
    document.getElementById("inp-descriere").oninput = function() {
        let val = this.value.trim().toLowerCase();
        if(!/[<>]/.test(val)) {
            this.classList.remove("is-invalid");
        }
    };


    // ==========================================
    // 4. BUTONUL FILTRARE
    // ==========================================
    // document.getElementById("filtrare").onclick=function(){
    function aplicaFiltrare() {
        
        // --- PRELUARE ȘI VALIDARE DATE ---
        let inpNume = eliminaDiacritice(document.getElementById("inp-nume").value.trim().toLowerCase()); // bonus diacritice
        if(inpNume.length > 0 && !isNaN(inpNume)) {
            alert("Numele produsului nu poate fi format doar din cifre!");
            return;
        }

        let inpDescriereElem = document.getElementById("inp-descriere");
        let inpDescriere = eliminaDiacritice(inpDescriereElem.value.trim().toLowerCase());
        
        if(inpDescriere.length > 0 && /[<>]/.test(inpDescriere)) {
            inpDescriereElem.classList.add("is-invalid");
            return; 
        }
        
        let inpMaterial=document.getElementById("inp-material").value.trim().toLowerCase()

        let grupRadio=document.getElementsByName("gr_rad")
        let garantieMin, garantieMax, isToateRadio=false;
        for (let rad of grupRadio){
            if (rad.checked){
                if (rad.value!="toate"){
                    // Fiind o valoare fixă și nu un interval, setăm atât minimul
                    // cât și maximul cu aceeași valoare pentru a respecta logica existentă
                    let valGarantie = parseInt(rad.value);
                    garantieMin = valGarantie;
                    garantieMax = valGarantie;
                }
                else{
                    isToateRadio=true
                }
                break
            }
        }

        let inpProfesional = document.getElementById("inp-profesional").checked; 

        let inpPretMin=parseFloat(document.getElementById("inp-pret-min").value.trim())
        let inpPretMax=parseFloat(document.getElementById("inp-pret-max").value.trim())
        if(inpPretMin > inpPretMax) {
            alert("Prețul minim nu poate fi mai mare decât prețul maxim!");
            return;
        }

        let inpCategorie=document.getElementById("inp-categorie").value.trim().toLowerCase()

        let selectAlimentare = document.getElementById("inp-alimentare");
        let optiuniSelectateAlimentare = Array.from(selectAlimentare.options)
                                              .filter(opt => opt.selected)
                                              .map(opt => opt.value.toLowerCase());
        let isToateAlimentare = optiuniSelectateAlimentare.includes("toate");


        // --- FILTRAREA EFECTIVĂ ---
        let produse=document.getElementsByClassName("produs")
        for (let prod of produse){
            prod.style.display="none" // ascundem temporar tot

            // let numeProdus = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let numeProdus = eliminaDiacritice(prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase());
            let cond1 = false;
            if(inpNume === "") {
                cond1 = true;
            } else if (inpNume.includes("*")) {
                let parti = inpNume.split("*");
                let inceput = parti[0];
                let sfarsit = parti[1];
                if(numeProdus.startsWith(inceput) && numeProdus.endsWith(sfarsit)) {
                    cond1 = true;
                }
            } else {
                cond1 = numeProdus.includes(inpNume);
            }

            // let descriereProdus = prod.getElementsByClassName("descriere")[0].innerHTML.trim().toLowerCase();
            let descriereProdus = eliminaDiacritice(prod.getElementsByClassName("descriere")[0].innerHTML.trim().toLowerCase());
            let cond2 = (inpDescriere === "" || descriereProdus.includes(inpDescriere));

            let materialProdus = prod.getElementsByClassName("val-material")[0].innerHTML.trim().toLowerCase();
            let cond3 = (inpMaterial === "" || materialProdus.includes(inpMaterial));

            let garantieProd = parseInt(prod.getElementsByClassName("val-garantie")[0].innerHTML.trim());
            let cond4 = (garantieProd >= garantieMin && garantieProd <= garantieMax) || isToateRadio;

            let profesionalProd = prod.getElementsByClassName("val-profesional")[0].innerHTML.trim(); 
            let cond5 = true; 
            if(inpProfesional == true && profesionalProd == "Nu") {
                cond5 = false; 
            }

            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond6 = (pret >= inpPretMin && pret <= inpPretMax);

            let categorieProd = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond7 = (categorieProd == inpCategorie || inpCategorie == "toate");

            let alimentareProd = prod.getElementsByClassName("val-alimentare")[0].innerHTML.trim().toLowerCase();
            let cond8 = false;
            if (isToateAlimentare) {
                cond8 = true;
            } else {
                for(let opt of optiuniSelectateAlimentare) {
                    if(alimentareProd.includes(opt)) {
                        cond8 = true;
                        break;
                    }
                }
            }

            // Marcăm dacă produsul respectă absolut toate condițiile
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                prod.dataset.treceFiltru = "true";
            } else {
                prod.dataset.treceFiltru = "false";
            }
        }
        
        // Trimitem la paginare doar produsele marcate cu 'true'
        let produseDupaFiltru = Array.from(produse).filter(p => p.dataset.treceFiltru === "true");
        actualizeazaPaginare(produseDupaFiltru);

        // BONUS 3: Verificare dacă array-ul e gol
        if (produseDupaFiltru.length === 0) {
            document.getElementById("mesaj-fara-produse").style.display = "block";
        } else {
            document.getElementById("mesaj-fara-produse").style.display = "none";
        }
    } 


    // ==========================================
    // 5. BUTONUL RESETARE
    // ==========================================
    document.getElementById("resetare").onclick=function(){
        if(confirm("Ești sigur că vrei să resetezi toate filtrele?")) {
            
            document.getElementById("inp-nume").value="";
            document.getElementById("inp-descriere").value="";
            document.getElementById("inp-descriere").classList.remove("is-invalid");
            document.getElementById("inp-material").value="";
            
            document.getElementById("inp-pret-min").value="0";
            document.getElementById("infoRangeMin").innerHTML="(0)";
            
            document.getElementById("inp-pret-max").value="20000";
            document.getElementById("infoRangeMax").innerHTML="(20000)";
            
            document.getElementById("inp-categorie").value="toate";
            document.getElementById("i_rad_toate").checked=true; 
            document.getElementById("inp-profesional").checked = false; 
            
            let selectAlimentare = document.getElementById("inp-alimentare");
            for (let opt of selectAlimentare.options) {
                opt.selected = false;
            }
            selectAlimentare.options[0].selected = true; 

            // Readucem toate produsele la starea inițială și le paginăm iar
            let produse=document.getElementsByClassName("produs")
            let vProduse = Array.from(produse);
            vProduse.sort(function(a,b){
                let idA = parseInt(a.id.substring(3)); 
                let idB = parseInt(b.id.substring(3));
                return idA - idB; 
            });
            for (let prod of vProduse){
                prod.dataset.treceFiltru = "true";
                prod.parentElement.appendChild(prod); 
            }
            actualizeazaPaginare(vProduse);
        }
    }


    // ==========================================
    // 6. FUNCȚIA DE SORTARE
    // ==========================================
    function sorteaza(semn){
        let produse=document.getElementsByClassName("produs")
        let vProduse= Array.from(produse)
        vProduse.sort(function(a,b){
            let numeA = a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let numeB = b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            
            if (numeA == numeB){
                let descA = a.getElementsByClassName("descriere")[0].innerHTML.trim().length;
                let descB = b.getElementsByClassName("descriere")[0].innerHTML.trim().length;
                return semn * (descA - descB);
            }

            return semn * numeA.localeCompare(numeB);
        })
        for (let prod of vProduse){
            prod.parentElement.appendChild(prod)
        }

        // După ce le-am reordonat în DOM, le paginăm (păstrând doar cele ce au trecut de un eventual filtru anterior)
        let produseDupaSortare = vProduse.filter(p => p.dataset.treceFiltru === "true");
        actualizeazaPaginare(produseDupaSortare);
    }

    document.getElementById("sortCrescNume").onclick=function(){sorteaza(1)}
    document.getElementById("sortDescrescNume").onclick=function(){sorteaza(-1)}


    // ==========================================
    // 7. CALCULARE SUMĂ
    // ==========================================
    function calculeazaSuma() {
        let produse = document.getElementsByClassName("produs");
        let suma = 0;
        for (let prod of produse){
            // Calculăm pentru toate produsele filtrate pozitiv (chiar dacă sunt pe altă pagină ascunse)
            if (prod.dataset.treceFiltru === "true"){
                suma += parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            }
        }

        let divSuma = document.getElementById("infoSumaFix");
        if(!divSuma){
            divSuma = document.createElement("div");
            divSuma.id = "infoSumaFix";
            
            divSuma.innerHTML = "Suma produselor filtrate: " + suma.toFixed(2) + " Lei";
            
            document.body.appendChild(divSuma);

            setTimeout(function(){
                let divStergere = document.getElementById("infoSumaFix");
                if(divStergere) {
                    divStergere.remove();
                }
            }, 2000);
        }
    }

    document.getElementById("calculare").onclick = calculeazaSuma;

    window.onkeydown=function(e){
        if (e.key=="c" && e.altKey){
            calculeazaSuma();
        }
    }

    // BONUS 14: Cel mai ieftin produs din fiecare categorie (0.3p)
    // ==========================================
    function marcheazaCeleMaiIeftine() {
        let produse = document.getElementsByClassName("produs");
        let minimeCategorii = {}; // Obiect pentru a memora minimul pentru fiecare categorie

        // Pasul 1: Identificăm prețul minim per categorie
        for (let prod of produse) {
            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());

            // Dacă e primul din categorie SAU e mai ieftin decât cel precedent salvat
            if (!minimeCategorii[categorie] || pret < minimeCategorii[categorie].pret) {
                minimeCategorii[categorie] = { pret: pret, element: prod };
            }
        }

        // Pasul 2: Lipim clasa creată în SCSS doar pe produsele găsite mai sus
        for (let cat in minimeCategorii) {
            let prodCelMaiIeftin = minimeCategorii[cat].element;
            let containerNume = prodCelMaiIeftin.getElementsByClassName("nume")[0];
            
            let badgeIeftin = document.createElement("span");
            badgeIeftin.className = "badge-cel-mai-ieftin"; // Facem legătura cu SCSS-ul
            badgeIeftin.innerHTML = "<i class='bi bi-tag-fill'></i> Cel mai ieftin!";
            
            containerNume.appendChild(badgeIeftin);
        }
    }
    
    // O apelăm o singură dată la încărcarea paginii
    marcheazaCeleMaiIeftine();

} // Aici se închide window.onload. NU MAI ADAUGA NIMIC DUPĂ ACEASTĂ LINIE!