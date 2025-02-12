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
// Hirdetés adatainak beküldése a Google Sheets-be
function submitAdToGoogleSheets(adData) {
    const url = 'https://script.google.com/macros/s/AKfycbycN2R1gda4HbFJouObLy3qTDg6ks0W3paKXhDoPspeOPtaQRDEgB79LxSM2c0aPeBD/exec';
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(adData),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // CORS engedélyezése
        },
        mode: 'cors',  // CORS engedélyezés a frontendben
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
    const url = 'https://script.google.com/macros/s/AKfycbycN2R1gda4HbFJouObLy3qTDg6ks0W3paKXhDoPspeOPtaQRDEgB79LxSM2c0aPeBD/exec';

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

// Hirdetések megjelenítése JSONP hívásból
function displayAds(ads) {
    const adsList = document.getElementById('adsList');
    adsList.innerHTML = ''; // Előző hirdetések törlése

    ads.forEach(ad => {
        const adItem = document.createElement('div');
        adItem.className = 'ad-item';
        adItem.innerHTML = `
            <pre>Dátum: ${ad.date}</pre>
            <pre>Hirdetés: ${ad.adContent}</pre>
            <pre>Email: ${ad.email}</pre>
            <pre>Telefonszám: ${ad.phone}</pre>
            <pre>Ár: ${ad.price} Ft</pre>
        `;
        adsList.appendChild(adItem);
    });
}

// Hirdetések lekérése a kezdeti bet

