const stopName = document.getElementById('stopName');
const ulBuses = document.getElementById('buses');
const stopIdInput = document.getElementById('stopId');

function getInfo() {
    const stopId = stopIdInput.value;
    stopIdInput.value = '';
    stopName.textContent = '';
    ulBuses.textContent = '';

    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`

    fetch(url)
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                stopName.textContent = 'ERROR';
                return;
            }
            stopName.textContent = data.name;
            for (const key in data.buses) {
                const li = document.createElement('li');
                li.textContent = `Bus ${key} arrives in ${data.buses[key]}`;
                ulBuses.appendChild(li);
            }
        })
}
