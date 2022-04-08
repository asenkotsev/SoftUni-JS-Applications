
function solve() {
    const infoSpan = document.getElementsByClassName('info')[0];
    const arriveBtn = document.querySelector('#arrive');
    const departBtn = document.querySelector('#depart');
    let currentStopId = 'depot';
    let currentStopName = '';
    function depart() {
        const url = `https://judgetests.firebaseio.com/schedule/${currentStopId}.json`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    infoSpan.textContent = 'Error';
                    departBtn.disabled = true;
                    arriveBtn.disabled = true;
                    return;
                }
                currentStopName = data.name;
                currentStopId = data.next;
                infoSpan.textContent = `Next stop ${currentStopName}`
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${currentStopName}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();