window.addEventListener('load', async () => {
    const tbody = document.getElementById('#results > tbody');
    tbody.innerHTML = '';
    const data = await getData();
    data.sort((a, b) => a.ID - b.ID).forEach(student => {
        const tr = renderStudents(student);
        tbody.appendChild(tr);
    });

    function renderStudents(student){
        return el('tr',[
            el('td', student.ID),
            el('td', student.FirstName),
            el('td', student.LastName),
            el('td', student.FacultyNumber),
            el('td', student.Grade)
        ])
    }
})

const applicationId = 'C553691A-C5F0-B1C7-FFD6-2A4EFE22FD00';
const restApiId = 'CA21B720-2B19-478D-937B-6A264CBBD5F5';

function url(end) {
    return `https://api.backendless.com/${applicationId}/${restApiId}/data/${end}`;
}

async function getData(){
    const response = await fetch(url("students"));
    return await response.json();
}

function el(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
        Object.assign(result, attributes);
    };

    if (Array.isArray(content)) {
        content.forEach(append);
    } else if (content !== null && content !== undefined) {
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