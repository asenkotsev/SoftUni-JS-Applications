locationInput = document.getElementById('location');
submitBtn = document.getElementById('submit');
currentDiv = document.getElementById('current');
upcomingDiv = document.getElementById('upcoming');
forecastDiv = document.getElementById('forecast');


const forecastSymbols = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂'
}

function createSpanUpcoming(obj) {
    return el('span', [
        el('span', forecastSymbols[obj.condition], { className: 'symbol' }),
        el('span', `${obj.low}°/${obj.high}°`, { className: 'forecast-data' }),
        el('span', obj.condition, { className: 'forecast-data' })
    ], { className: "upcoming" });
}
function attachEvents() {
    submitBtn.addEventListener('click', async () => {
        upcomingDiv.textContent = '';
        currentDiv.textContent = '';

        const query = locationInput.value;
        const queryObj = await getCode(query);

        if (queryObj) {
            const code = queryObj.code;
            const todayData = await getToday(code);
            const upcomingData = await getUpcoming(code);
            const currentLabelDiv = el('div', 'Current conditions', { className: 'label' });
            Promise.all([todayData, upcomingData]).then(([today, upcoming]) => {
                forecastDiv.style.display = 'block';
                const condition = today.forecast.condition;
                const todayEl = el('div', [
                    el('span', `${forecastSymbols[condition]}`, { className: 'condition symbol' }),
                    el('span', [
                        el('span', `${today.name}`, { className: 'forecast-data' }),
                        el('span', `${today.forecast.low}°/${today.forecast.high}°`, { className: 'forecast-data' }),
                        el('span', `${condition}`, { className: 'forecast-data' })
                    ], { className: 'condition' })
                ], { className: 'forecasts' });
                currentDiv.appendChild(currentLabelDiv);
                currentDiv.appendChild(todayEl);

                const upcomingLabelDiv = el('div', 'Three-day forecast', { className: 'label' });
                const upcomingEl = el('div',
                    upcoming.forecast.map(createSpanUpcoming),
                    { className: 'forecast-info' });

                upcomingDiv.style.display = 'block';
                upcomingDiv.appendChild(upcomingLabelDiv);
                upcomingDiv.appendChild(upcomingEl);
            });
        } else {
            forecastDiv.style.display = 'block';
            upcomingDiv.style.display = 'none';
            currentDiv.textContent = 'Invalid location!';
        }
    });
}

function el(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
        Object.assign(result, attributes);
    };

    if (Array.isArray(content)) {
        content.forEach(append);
    } else {
        append(content);
    };

    function append(node) {
        if (typeof node === 'string' || typeof node === 'number') {
            node = document.createTextNode(node);
        };
        result.appendChild(node);
    };

    return result;
};

async function getCode(name) {

    const data = await fetch('https://judgetests.firebaseio.com/locations.json').then(res => res.json());

    return data.find(x => x.name.toLowerCase() == name.toLowerCase());
}
async function getToday(code) {
    return await fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`).then(res => res.json());
}
async function getUpcoming(code) {
    return await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`).then(res => res.json());
}

attachEvents();
