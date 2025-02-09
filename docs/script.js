document.getElementById('adForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const adContent = document.getElementById('adContent').value;
    const advertiserEmail = document.getElementById('advertiserEmail').value;
    const advertiserPhone = document.getElementById('advertiserPhone').value;
    const adDate = document.getElementById('adDate').value;
    const adPrice = document.getElementById('adPrice').value;

    const adData = {
        'date': adDate,
        'adContent': adContent,
        'email': advertiserEmail,
        'phone': advertiserPhone,
        'price': adPrice
    };

    // Hirdetés adatok beküldése Google Sheets-be
    submitAdToGoogleSheets(adData);
});

// Hirdetés adatainak beküldése a Google Sheets-be
function submitAdToGoogleSheets(adData) {
    const url = 'https://script.google.com/macros/s/AKfycbws8c3jm6d23ur8A3lk5oNaXrUDf_1orWhUunphwZ4JiWYxqjl1oafiESbY-dnU3cBf/exec';
    
    fetch(url, {
        method: 'POST',
        mode: 'cors', // 🔥 CORS engedélyezése
        body: JSON.stringify(adData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Hirdetés sikeresen feltöltve!');
        fetchAdsFromGoogleSheets(); // Hirdetések frissítése
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Google Sheetsből hirdetések lekérése
function fetchAdsFromGoogleSheets() {
    const url = 'https://script.google.com/macros/s/AKfycbws8c3jm6d23ur8A3lk5oNaXrUDf_1orWhUunphwZ4JiWYxqjl1oafiESbY-dnU3cBf/exec';

    fetch(url, {
        method: 'GET', // 🔥 GET kérés, mert csak lekérjük az adatokat
        mode: 'cors' // 🔥 CORS engedélyezése
    })
    .then(response => response.json())
    .then(data => {
        console.log('Hirdetések:', data);
        displayAds(data); // Hirdetések megjelenítése
    })
    .catch(error => console.error('Hiba történt a hirdetések lekérésekor:', error));
}

// Hirdetések megjelenítése
function displayAds(ads) {
   const adsList = document.getElementById('adsList');
    adsList.innerHTML = ''; // Törli az előző hirdetéseket

    ads.forEach(ad => {
        const adItem = document.createElement('div');
        adItem.className = 'ad-item';

        adItem.innerHTML = `
            <pre>Dátum: ${ad["Dátum"]}</pre>
            <pre>Hirdetés: ${ad["Hirdetés tartalma"]}</pre>
            <pre>Email: ${ad["Email cím"]}</pre>
            <pre>Telefonszám: ${ad["Telefonszám"]}</pre>
            <pre>Ár: ${ad["Ár (Ft)"]} Ft</pre>
        `;
        adsList.appendChild(adItem);
    });
}

// Az oldal betöltésekor lekéri a hirdetéseket
fetchAdsFromGoogleSheets();
