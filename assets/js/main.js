document.addEventListener('DOMContentLoaded', () => {
    const ranges = {
        'range-1-5': [1, 2, 3, 4, 5],
        'range-6-11': [6, 7, 8, 9, 10, 11],
        'range-12-17': [12, 13, 14, 15, 16, 17]
    };

    const colors = {
        'range-1-5': 'blue',
        'range-6-11': 'green',
        'range-12-17': 'red'
    };

    const characterImages = {
        1: 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
        2: 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
        3: 'https://starwars-visualguide.com/assets/img/characters/3.jpg',
        4: 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
        5: 'https://starwars-visualguide.com/assets/img/characters/5.jpg',
        6: 'https://starwars-visualguide.com/assets/img/characters/6.jpg',
        7: 'https://starwars-visualguide.com/assets/img/characters/7.jpg',
        8: 'https://starwars-visualguide.com/assets/img/characters/8.jpg',
        9: 'https://starwars-visualguide.com/assets/img/characters/9.jpg',
        10: 'https://starwars-visualguide.com/assets/img/characters/10.jpg',
        11: 'https://starwars-visualguide.com/assets/img/characters/11.jpg',
        12: 'https://starwars-visualguide.com/assets/img/characters/12.jpg',
        13: 'https://starwars-visualguide.com/assets/img/characters/13.jpg',
        14: 'https://starwars-visualguide.com/assets/img/characters/14.jpg',
        15: 'https://starwars-visualguide.com/assets/img/characters/15.jpg',
        16: 'https://starwars-visualguide.com/assets/img/characters/16.jpg',
        17: 'https://starwars-visualguide.com/assets/img/characters/17.jpg'
    };

    let displayedCharacters = {
        'range-1-5': 0,
        'range-6-11': 0,
        'range-12-17': 0
    };

    let totalCharacters = {
        'range-1-5': 5,
        'range-6-11': 6,
        'range-12-17': 6
    };

    function fetchCharacterData(rangeId, id) {
        const container = document.getElementById(rangeId);
        fetch(`https://swapi.dev/api/people/${id}/`)
            .then(response => response.json())
            .then(data => {
                const characterBlock = document.createElement('div');
                characterBlock.className = 'character-block';
                characterBlock.innerHTML = `
                    <button class="card-close">×</button>
                    <img src="${characterImages[id]}" alt="${data.name}" class="character-img">
                    <div class="character-icon ${colors[rangeId]}"></div>
                    <div class="character-name">${data.name}</div>
                    <div class="character-info">Estatura: ${data.height} cm<br>Peso: ${data.mass} kg</div>
                `;
                container.appendChild(characterBlock);
                updateLoadButton(rangeId);

                // Añadir el evento de clic para el botón cerrar después de agregarlo al DOM
                const closeButton = characterBlock.querySelector('.card-close');
                closeButton.addEventListener('click', () => removeCard(characterBlock));
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function removeCard(card) {
        const container = card.parentElement;
        container.removeChild(card);
        const rangeId = container.id;
        displayedCharacters[rangeId]--;
        updateLoadButton(rangeId);
    }

    function updateLoadButton(rangeId) {
        const button = document.querySelector(`[onclick="loadCharacters('${rangeId}')"]`);
        const currentCount = displayedCharacters[rangeId];
        const totalCount = totalCharacters[rangeId];

        if (currentCount >= totalCount) {
            button.textContent = 'No hay más personajes';
            button.disabled = true;
        } else {
            button.textContent = 'Ver Personajes';
            button.disabled = false;
        }
    }

    window.loadCharacters = function(rangeId) {
        const ids = ranges[rangeId];
        const currentIndex = displayedCharacters[rangeId];

        if (currentIndex < ids.length) {
            fetchCharacterData(rangeId, ids[currentIndex] + 1); // ID ajustado para que coincida con el punto final de la API
            displayedCharacters[rangeId]++;
        }

        updateLoadButton(rangeId);
    };

    // Inicializar estados de botones
    updateLoadButton('range-1-5');
    updateLoadButton('range-6-11');
    updateLoadButton('range-12-17');
});
