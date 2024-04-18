//1. setup
// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Stel het basis endpoint in
const apiUrl = "https://fdnd-agency.directus.app/items/"
const apiFamily = (apiUrl + 'oba_family')
const apiProfile = (apiUrl + 'oba_profile')
const apiItem = (apiUrl + 'oba_item')


// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// array & objects
let leeslijst = {}


// 2. routes
app.get('/', async function(request, response) {
  try {
    // Haal zowel de items als de gebruikersgegevens op
    const itemsPromise = fetchJson(apiItem);
    const familiesPromise = fetchJson(apiFamily);
    const profilesPromise = fetchJson(apiProfile);

    // Wacht tot beide fetch-aanroepen zijn voltooid
    const [items, families, profiles] = await Promise.all([itemsPromise, familiesPromise, profilesPromise]);

    console.log("Items:", items);
    console.log("Families:", families);
    console.log("Profiles:", profiles);

    // Controleer of de respons geldig is
    if (items && items.data && families && families.data && profiles && profiles.data) {
      // Rendert de 'index' weergave met de opgehaalde gegevens
      response.render('index', {
        items: items.data,
        families: families.data,
        profiles: profiles.data
      });
    } else {
      console.error("Invalid or unexpected API response format");
      response.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get('/family', async function(request, response) {
    try {
      const families = await fetchJson(apiFamily);
      const profiles = await fetchJson(apiProfile);
  
      console.log(families.data);
      console.log(profiles.data);
  
      response.render('family', {
        families: families.data,
        profiles: profiles.data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      response.status(500).send('Internal Server Error');
    }
  });


  app.get('/detail/:id', function(request, response){
    console.log(request.params)
    const id = request.params.id;

    fetchJson(apiItem + '?filter={"id":' + id + '}').then((items) => {
        response.render('detail', {
            items: items.data,
            bookmarkFill: request.query.added ? 'currentColor' : 'none'
        });
    });
});


app.post('/detail/:id', function(request, response){
     // Er is nog geen afhandeling van POST, redirect naar GET op /
  const id = request.params.id;
  

  // Voeg het bericht toe aan de messages array
  leeslijst[id] = true;
  console.log(leeslijst)

  // Redirect naar de GET route voor de specifieke persoon met het bijgewerkte bericht
  // '/person/' + id zorgt ervoor dat hij redirect naar waar je de message hebt aangemaakt. 
  response.redirect(303, '/detail/' + id + '?added=true');
});
  

app.get('/leeslijst', function(request, response) {
  fetchJson(apiItem).then((items) => {
      
      let itemsOpLeeslijst = []
      // Loop door alle items.data,
      // Kijk of het id van dat item in de leeslijst staat
      // Voeg in dat geval dat item toe aan itemsOpLeeslijst
      items.data.forEach(function(item) {
        if (leeslijst[item.id]) {
          itemsOpLeeslijst.push(item)
        }
      })
  
      if (itemsOpLeeslijst.length) {
          response.render('leeslijst', {
              items: itemsOpLeeslijst
          });
      } else {
          // Render lege staat (empty state)
          response.render('leeslijst_empty');
      }
  }).catch((error) => {
      console.error("Error fetching items:", error);
      response.status(500).send("Internal Server Error");
  });
});

// 3. Start de webserver

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
