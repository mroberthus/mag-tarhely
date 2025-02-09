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
    const url = 'https://script.google.com/macros/s/AKfycbySqB_kDbm1fKjG_i7M_lvyZcPPSR4RR9r8MGzFZdbexTS8IMBgxr6TZgsjyma-sy8Y/exec';
    
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
    const url = 'https://script.google.com/macros/s/AKfycbySqB_kDbm1fKjG_i7M_lvyZcPPSR4RR9r8MGzFZdbexTS8IMBgxr6TZgsjyma-sy8Y/exec?action=getAds';

fetch(url, {
    method: 'POST',
    mode: 'cors', // 🔥 CORS engedélyezése
    body: JSON.stringify(adData),
    headers: {
        'Content-Type': 'application/json'
    }
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
            <pre>Dátum: ${ad.date}</pre>
            <pre>Hirdetés: ${ad.adContent}</pre>
            <pre>Email: ${ad.email}</pre>
            <pre>Telefonszám: ${ad.phone}</pre>
            <pre>Ár: ${ad.price} Ft</pre>
        `;
        adsList.appendChild(adItem);
    });
}

// Az oldal betöltésekor lekéri a hirdetéseket
fetchAdsFromGoogleSheets();
