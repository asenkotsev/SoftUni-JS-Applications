function attachEvents() {
    const baseUrl = 'http://localhost:8000/phonebook'
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const phonebookUl = document.getElementById('phonebook');

        createBtn.addEventListener('click', create);
        loadBtn.addEventListener('click', load);


    function create() {
        const person = personInput.value;
        const phone = phoneInput.value;
        const data = { person, phone };

        fetch(baseUrl + '.json', {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
        personInput.value = '';
        phoneInput.value = '';
        load();

    };
    function load() {
        phonebookUl.textContent = '';
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                Object.keys(data).forEach((key) => {
                    const li = document.createElement('li');
                    const btnDelete = document.createElement('button');
                    btnDelete.textContent = 'Delete';
                    btnDelete.id = key;
                    btnDelete.addEventListener('click', onDelete);
                    li.textContent = `${data[key].person}:${data[key].phone}`;
                    phonebookUl.appendChild(li);
                    li.appendChild(btnDelete);
                })
            })
    }

    function onDelete(e) {
        const url = `${baseUrl}/${e.target.id}.json`;
        fetch(url, {
            method: "DELETE"
        })
        e.target.parentElement.remove();
    }
}

attachEvents();