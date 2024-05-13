// Selecteer het <html> element
const htmlElement = document.documentElement;

// Voeg de class "js" toe aan het <html> element
htmlElement.classList.add("js");



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


const currentUrl = window.location.href;
const button = document.querySelector(".add");
const notification = document.querySelector('.sidebar li:nth-child(2) a');
const notificationIcon = document.querySelector('.sidebar li:nth-child(2) a i');
let lijstForm = document.querySelector('.save')

console.log(lijstForm)

lijstForm.addEventListener('submit', function(event) {
    let savedItem = new FormData(this)


    savedItem.append('enhanced', true)
    console.log(this.action)
    

    fetch(this.action, {
        method: this.method,
        
        body: new URLSearchParams(savedItem)
    }).then()
    // Haal de URL op van de huidige pagina
    // Controleer of de URL het "added=true" query parameter bevat
    
        // SVG-icoon aanpassen
        notification.classList.add("notification")
        notificationIcon.classList.add("notification")
        const svgIcon = document.querySelector(".bi-bookmark-fill");

        // Verander de fill kleur naar currentColor (wit in dit geval)
        svgIcon.setAttribute("fill", "currentColor");
        
    
    event.preventDefault()
})

// Roep de functie aan zodra de pagina geladen is

// const currentUrl = window.location.href;
// const button = document.querySelector(".add");
// const notification = document.querySelector('.sidebar li:nth-child(2) a');
// const notificationIcon = document.querySelector('.sidebar li:nth-child(2) a i');


// function bookMark() {
//     // Haal de URL op van de huidige pagina
    
//     // Controleer of de URL het "added=true" query parameter bevat
//     if (currentUrl.includes("added=true")) {
//         // SVG-icoon aanpassen
//         notification.classList.add("notification")
//         notificationIcon.classList.add("notification")
//         const svgIcon = document.querySelector(".bi-bookmark-fill");

//         // Verander de fill kleur naar currentColor (wit in dit geval)
//         svgIcon.setAttribute("fill", "currentColor");
//     }
// }

// // Roep de functie aan zodra de pagina geladen is
// bookMark()

  
const infoButton = document.querySelector(".info-button")
const infoArrow = document.querySelector(".info-button i")
const infoMenu = document.querySelector(".item-info")

infoButton.addEventListener("click", () =>{
    infoMenu.classList.toggle("openMenu");
    infoArrow.classList.toggle("rotate")
})