// Prevenirea flash-ului alb (FOUC) la încărcare
if(document.body) {
    if (localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

window.addEventListener("DOMContentLoaded", function() {
    // Asigurăm aplicarea clasei imediat după încărcarea DOM-ului
    if (localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark");
    }

    let btnTema = document.getElementById("btn-tema");

    if (btnTema) {
        // Sincronizează iconița cu tema actuală
        let iconTema = btnTema.querySelector("i, svg");
        if (iconTema && document.body.classList.contains("dark")) {
            iconTema.classList.remove("fa-moon");
            iconTema.classList.add("fa-sun");
        }

        // Eveniment de click pentru comutare
        btnTema.addEventListener("click", function(e) {
            e.preventDefault(); // prevenim un click în gol
            document.body.classList.toggle("dark");
            
            let iconAct = btnTema.querySelector("i, svg");
            if (document.body.classList.contains("dark")) {
                localStorage.setItem("tema", "dark");
                if(iconAct) { iconAct.classList.remove("fa-moon"); iconAct.classList.add("fa-sun"); }
            } else {
                localStorage.setItem("tema", "light");
                if(iconAct) { iconAct.classList.remove("fa-sun"); iconAct.classList.add("fa-moon"); }
            }
        });
    }
});