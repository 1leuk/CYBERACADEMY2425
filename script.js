const url = 'https://api.thedogapi.com/v1/breeds';

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            displayNews(data);
        } else {
            console.error('Error fetching dog breeds data:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('breeds');
    if (!newsContainer) {
        console.error("Not Found");
        return;
    }

    newsContainer.innerHTML = '';

    const isi = articles.slice(0, 10);

    isi.forEach((article) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'breed-card';

        const gambarId = article.reference_image_id;
        const UrlGambar = gambarId 
            ? `https://cdn2.thedogapi.com/images/${gambarId}.jpg`
            : 'https://via.placeholder.com/300x200?text=No+Image';

        const currentDate = new Date().toLocaleDateString();

        newsItem.innerHTML = `
            <div class="card-image">
                <img src="${UrlGambar}" alt="${article.name}" class="breed-image">
            </div>
            <div class="card-content">
                <h2 class="breed-title">${article.name}</h2>
                <p class="breed-description"><strong>Description:</strong> ${article.temperament || 'No description available'}</p>
                <p class="breed-date"><strong>Date:</strong> ${currentDate}</p>
            </div>
        `;

        newsContainer.appendChild(newsItem);
    });
}

fetchNews();
