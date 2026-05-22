window.onload=function(){

    // ACTUALIZARE RANGE-URI ÎN TIMP REAL
    document.getElementById("inp-pret-min").onchange=function(){
        let val=this.value.trim()
        document.getElementById("infoRangeMin").innerHTML=`(${val})`
    }
    document.getElementById("inp-pret-max").onchange=function(){
        let val=this.value.trim()
        document.getElementById("infoRangeMax").innerHTML=`(${val})`
    }
    
    // Corectare automată validare textarea (se înlătură is-invalid dacă utilizatorul scrie text bun)
    document.getElementById("inp-descriere").oninput = function() {
        let val = this.value.trim().toLowerCase();
        if(!/[<>]/.test(val)) {
            this.classList.remove("is-invalid");
        }
    };

    // BUTONUL FILTRARE
    document.getElementById("filtrare").onclick=function(){
        
        // --- 1. PRELUARE ȘI VALIDARE DATE ---
        let inpNume=document.getElementById("inp-nume").value.trim().toLowerCase()
        // Validare Nume (să nu fie doar cifre)
        if(inpNume.length > 0 && !isNaN(inpNume)) {
            alert("Numele produsului nu poate fi format doar din cifre!");
            return; // oprim filtrarea
        }

        let inpDescriereElem = document.getElementById("inp-descriere");
        let inpDescriere = inpDescriereElem.value.trim().toLowerCase();
        
        // Validare Textarea utilizând clasa Bootstrap (is-invalid)
        if(inpDescriere.length > 0 && /[<>]/.test(inpDescriere)) {
            inpDescriereElem.classList.add("is-invalid");
            return; // oprim filtrarea dacă datele nu sunt valide
        }
        
        let inpMaterial=document.getElementById("inp-material").value.trim().toLowerCase()

        // Garanție (Grup de Radio)
        let grupRadio=document.getElementsByName("gr_rad")
        let garantieMin, garantieMax, isToateRadio=false;
        for (let rad of grupRadio){
            if (rad.checked){
                if (rad.value!="toate"){
                    [garantieMin, garantieMax]= rad.value.split(":")  
                    garantieMin=parseInt(garantieMin)
                    garantieMax=parseInt(garantieMax)
                }
                else{
                    isToateRadio=true
                }
                break
            }
        }

        // Checkbox Profesional
        let inpProfesional = document.getElementById("inp-profesional").checked; // returnează true/false

        // Preț Range
        let inpPretMin=parseFloat(document.getElementById("inp-pret-min").value.trim())
        let inpPretMax=parseFloat(document.getElementById("inp-pret-max").value.trim())
        // Validare Range
        if(inpPretMin > inpPretMax) {
            alert("Prețul minim nu poate fi mai mare decât prețul maxim!");
            return;
        }

        let inpCategorie=document.getElementById("inp-categorie").value.trim().toLowerCase()

        // Select Multiplu (Tip Alimentare)
        let selectAlimentare = document.getElementById("inp-alimentare");
        let optiuniSelectateAlimentare = Array.from(selectAlimentare.options)
                                              .filter(opt => opt.selected)
                                              .map(opt => opt.value.toLowerCase());
        let isToateAlimentare = optiuniSelectateAlimentare.includes("toate");


        // --- 2. FILTRAREA EFECTIVĂ ---
        let produse=document.getElementsByClassName("produs")
        for (let prod of produse){
            prod.style.display="none" // ascundem toate

            // Conditia 1: NUME (inclusiv cerinta cu steluta *)
            let numeProdus = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = false;
            if(inpNume === "") {
                cond1 = true;
            } else if (inpNume.includes("*")) {
                // Logica pentru "*": "cupt*r" -> se sparge in "cupt" si "r"
                let parti = inpNume.split("*");
                let inceput = parti[0];
                let sfarsit = parti[1];
                if(numeProdus.startsWith(inceput) && numeProdus.endsWith(sfarsit)) {
                    cond1 = true;
                }
            } else {
                cond1 = numeProdus.includes(inpNume);
            }

            // Conditia 2: DESCRIERE
            let descriereProdus = prod.getElementsByClassName("descriere")[0].innerHTML.trim().toLowerCase();
            let cond2 = (inpDescriere === "" || descriereProdus.includes(inpDescriere));

            // Conditia 3: MATERIAL
            let materialProdus = prod.getElementsByClassName("val-material")[0].innerHTML.trim().toLowerCase();
            let cond3 = (inpMaterial === "" || materialProdus.includes(inpMaterial));

            // Conditia 4: GARANȚIE (Radio)
            let garantieProd = parseInt(prod.getElementsByClassName("val-garantie")[0].innerHTML.trim());
            let cond4 = (garantieProd >= garantieMin && garantieProd <= garantieMax) || isToateRadio;

            // Conditia 5: UZ PROFESIONAL (Checkbox)
            let profesionalProd = prod.getElementsByClassName("val-profesional")[0].innerHTML.trim(); // "Da" sau "Nu"
            let cond5 = true; 
            if(inpProfesional == true && profesionalProd == "Nu") {
                cond5 = false; // Dacă am bifat că vreau profesional, dar el e "Nu", îl ascund
            }

            // Conditia 6: PREȚ (Cele 2 range-uri)
            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond6 = (pret >= inpPretMin && pret <= inpPretMax);

            // Conditia 7: CATEGORIE (Select Simplu)
            let categorieProd = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond7 = (categorieProd == inpCategorie || inpCategorie == "toate");

            // Conditia 8: ALIMENTARE (Select Multiplu)
            // Aici presupunem ca val-alimentare a fost adaugat in tabelul tau HTML
            // Daca nu ai clasa asta in HTML, adauga-o la un td ca sa functioneze. 
            // In codul pe care ti l-am dat anterior am uitat sa adaug alimentare in tabel, 
            // deci va trebui sa adaugi in EJS un rand cu <td><span class="val-alimentare"><%- prod.tip_alimentare %></span></td>
            let alimentareProd = prod.getElementsByClassName("val-alimentare")[0].innerHTML.trim().toLowerCase();
            let cond8 = false;
            if (isToateAlimentare) {
                cond8 = true;
            } else {
                // Verificam daca macar una din optiunile alese se regaseste in valoarea produsului
                for(let opt of optiuniSelectateAlimentare) {
                    if(alimentareProd.includes(opt)) {
                        cond8 = true;
                        break;
                    }
                }
            }


            // EVALUARE FINALĂ
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                prod.style.display="flex" // Păstrăm flex pentru containerul tau .produs
            }
        }
    }

    // BUTONUL RESETARE (Cu confirmare pt Anul 2 CTI)
    document.getElementById("resetare").onclick=function(){
        if(confirm("Ești sigur că vrei să resetezi toate filtrele?")) {
            
            // Resetare Inputuri
            document.getElementById("inp-nume").value="";
            document.getElementById("inp-descriere").value="";
            document.getElementById("inp-descriere").classList.remove("is-invalid");
            document.getElementById("inp-material").value="";
            
            document.getElementById("inp-pret-min").value="0";
            document.getElementById("infoRangeMin").innerHTML="(0)";
            
            document.getElementById("inp-pret-max").value="20000";
            document.getElementById("infoRangeMax").innerHTML="(20000)";
            
            document.getElementById("inp-categorie").value="toate";
            document.getElementById("i_rad4").checked=true; // radio "toate"
            document.getElementById("inp-profesional").checked = false; // debifare checkbox
            
            // Resetare Select Multiplu
            let selectAlimentare = document.getElementById("inp-alimentare");
            for (let opt of selectAlimentare.options) {
                opt.selected = false;
            }
            selectAlimentare.options[0].selected = true; // selecteaza "Toate"

            // Re-afisare toate produsele si ANULARE SORTARE (Reordonare dupa ID-ul artX)
            let produse=document.getElementsByClassName("produs")
            let vProduse = Array.from(produse);
            vProduse.sort(function(a,b){
                let idA = parseInt(a.id.substring(3)); // Ex: din "art12" ramane 12
                let idB = parseInt(b.id.substring(3));
                return idA - idB; // Sortare crescatoare dupa id-ul original din baza de date
            });
            for (let prod of vProduse){
                prod.style.display="flex"
                prod.parentElement.appendChild(prod); // Le punem inapoi in ordinea initiala
            }
        }
    }

    // FUNCȚIA DE SORTARE (Doua chei cerute in barem: Nume, apoi lungime descriere)
    function sorteaza(semn){
        let produse=document.getElementsByClassName("produs")
        let vProduse= Array.from(produse)
        vProduse.sort(function(a,b){
            let numeA = a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let numeB = b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            
            // Daca numele este la fel, sortam dupa cheia 2 (Lungimea descrierii)
            if (numeA == numeB){
                let descA = a.getElementsByClassName("descriere")[0].innerHTML.trim().length;
                let descB = b.getElementsByClassName("descriere")[0].innerHTML.trim().length;
                return semn * (descA - descB);
            }

            // Altfel, sortam alfabetic dupa Nume (cheia 1)
            return semn * numeA.localeCompare(numeB);
        })
        for (let prod of vProduse){
            prod.parentElement.appendChild(prod)
        }
    }

    document.getElementById("sortCrescNume").onclick=function(){sorteaza(1)}
    document.getElementById("sortDescrescNume").onclick=function(){sorteaza(-1)}


    // CALCULARE SUMĂ (Buton + Tasta Alt+C)
    function calculeazaSuma() {
        let produse = document.getElementsByClassName("produs");
        let suma = 0;
        for (let prod of produse){
            // calculam doar pentru cele vizibile
            if (window.getComputedStyle(prod).display != "none"){
                suma += parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            }
        }

        let divSuma = document.getElementById("infoSumaFix");
        if(!divSuma){
            divSuma = document.createElement("div");
            divSuma.id = "infoSumaFix";
            
            // Stilare dinamică (div fix cerut în barem)
            divSuma.style.position = "fixed";
            divSuma.style.top = "50%";
            divSuma.style.left = "50%";
            divSuma.style.transform = "translate(-50%, -50%)";
            divSuma.style.backgroundColor = "rgba(42, 54, 67, 0.9)";
            divSuma.style.color = "white";
            divSuma.style.padding = "20px 40px";
            divSuma.style.borderRadius = "10px";
            divSuma.style.fontSize = "24px";
            divSuma.style.zIndex = "9999";
            divSuma.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";

            divSuma.innerHTML = "Suma produselor afișate: " + suma.toFixed(2) + " Lei";
            
            document.body.appendChild(divSuma);

            // Dispariție după 2 secunde (2000 ms)
            setTimeout(function(){
                let divStergere = document.getElementById("infoSumaFix");
                if(divStergere) {
                    divStergere.remove();
                }
            }, 2000);
        }
    }

    // Apelare pe buton de calcul
    document.getElementById("calculare").onclick = calculeazaSuma;

    // Apelare pe comanda Alt+C
    window.onkeydown=function(e){
        if (e.key=="c" && e.altKey){
            calculeazaSuma();
        }
    }
}