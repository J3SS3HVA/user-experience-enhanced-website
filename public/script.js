const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

const listpopup = body.querySelector(".item-added") 
const closelist = body.querySelector(".item-added button") 
const currentUrl = window.location.href;
const button = document.querySelector(".add");
const filter = document.querySelector('.filter')

closelist.addEventListener("click" , () =>{
    listpopup.classList.add("closed");
    filter.classList.remove('filter-active')
})


function bookMark() {
    // Haal de URL op van de huidige pagina
    
    // Controleer of de URL het "added=true" query parameter bevat
    if (currentUrl.includes("added=true")) {
        // Dynamisch de tekst van de knop instellen
        listpopup.classList.add("show");
        filter.classList.toggle('filter-active');

        // SVG-icoon aanpassen
        const svgIcon = document.querySelector(".bi-bookmark-fill");

        // Verander de fill kleur naar currentColor (wit in dit geval)
        svgIcon.setAttribute("fill", "currentColor");
    }
}

// Roep de functie aan zodra de pagina geladen is
bookMark()

  
