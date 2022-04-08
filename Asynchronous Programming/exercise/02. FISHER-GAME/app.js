function attachEvents() {
    window.addEventListener('load', () => {
        const anglerInput = document.querySelector('#addForm > input.angler');
        const weightInput = document.querySelector('#addForm > input.weight');
        const speciesInput = document.querySelector('#addForm>  input.species');
        const locationInput = document.querySelector('#addForm > input.location');
        const baitInput = document.querySelector('#addForm > input.bait');
        const captureTimeInput = document.querySelector('#addForm > input.captureTime');
        const catchesDiv = document.getElementById('catches');

        document.querySelector('#addForm>button.add').addEventListener('click', add);
        document.querySelector('.load').addEventListener('click', load);

        function add() {
            const angler = anglerInput.value;
            const weight = weightInput.value;
            const species = speciesInput.value;
            const location = locationInput.value;
            const bait = baitInput.value;
            const captureTime = captureTimeInput.value;

            const data = { angler, weight, species, location, bait, captureTime };
            post(data);
            anglerInput.value = '';
            weightInput.value = '';
            speciesInput.value = '';
            locationInput.value = '';
            baitInput.value = '';
            captureTimeInput.value = '';
        };

        async function load() {
          document.getElementById('catches').innerHTML = '';
            const data = await get();
            if (!data) { alert('No catches...'); return; }
            Object.keys(data).forEach(key => {
                const fish = data[key];
                const div = createDiv(key, fish);
                const updateBtn = el('button', 'UPDATE', { className: 'update' });
                const deleteBtn = el('button', 'DELETE', { className: 'delete' });
                updateBtn.addEventListener('click', update);
                deleteBtn.addEventListener('click', remove);
                div.appendChild(updateBtn);
                div.appendChild(deleteBtn);
                catchesDiv.appendChild(div);
                function update() {
                    const angler = anglerInput.value;
                    const weight = weightInput.value;
                    const species = speciesInput.value;
                    const location = locationInput.value;
                    const bait = baitInput.value;
                    const captureTime = captureTimeInput.value;
                    const newData = { angler, weight, species, location, bait, captureTime };
                    put(key, newData)
                    updateBtn.textContent = "CHANGES SAVED!";
                    updateBtn.className = 'updated';
                    setTimeout(() => {
                        updateBtn.textContent = "UPDATE";
                        updateBtn.classList.remove('updated');
                    }, 1000)

                }
                function remove() {
                    fdelete(key);
                    div.remove();
                }

            });

        }

        function createDiv(id, dataObj) {
            return el('div', [
                el('label', 'Angler'),
                el('input', '', { type: 'text', className: 'angler', value: dataObj.angler }),
                el('hr', ''),
                el('label', 'Weight'),
                el('input', '', { type: 'text', className: 'weight', value: dataObj.weight }),
                el('hr', ''),
                el('label', 'Species'),
                el('input', '', { type: 'text', className: 'species', value: dataObj.species }),
                el('hr', ''),
                el('label', 'Location'),
                el('input', '', { type: 'text', className: 'location', value: dataObj.location }),
                el('hr', ''),
                el('label', 'Bait'),
                el('input', '', { type: 'text', className: 'bait', value: dataObj.bait }),
                el('hr', ''),
                el('label', 'Capture Time'),
                el('input', '', { type: 'text', className: 'captureTime', value: dataObj.captureTime }),
                el('hr', ''),
            ], { className: 'catch', "data-id": id })
        }
    })
}


function getUrl(endpoint) {
    return `https://fisher-game.firebaseio.com/${endpoint}.json`;
}

async function post(data) {
    try {
        return await fetch(getUrl('catches'), {
            "method": "POST",
            "Content-Type": "application/json",
            "body": JSON.stringify(data)
        }).then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

async function get() {
    try {
        return await fetch(getUrl('catches')).then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

async function fdelete(id) {
    try {
        return await fetch(getUrl(`catches/${id}`), {
            method: "DELETE"
        })
            .then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

async function put(id, data) {
    try {
        return await fetch(getUrl(`catches/${id}`), {
            method: "PUT",
            "Content-Type": "application/json",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
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

attachEvents();

