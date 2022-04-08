window.addEventListener('load', () => {
    document.getElementById('loadBooks').addEventListener('click', onLoad);
    const table = document.querySelector('table tbody');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const isbnInput = document.getElementById('isbn');
    document.querySelector('form > button').addEventListener('click', onSumbit);

    async function onSumbit(e) {
        e.preventDefault();
        const book = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };
        try {
            if (titleInput.value == '') {
                alert('Title input should not be blank');
                return;
            } else if (authorInput.value == '') {
                alert('Author input should not be blank');
                return;
            } else if (isbnInput.value == '') {
                alert('Isbn input should not be blank');
                return;
            };
            const created = await createBook(book);
            table.appendChild(bookToHTML(created));
            titleInput.value = '';
            authorInput.value = '';
            isbnInput.value = '';
        } catch (err) {
            alert(err);
        }
    }


    async function onLoad() {
        const books = await getBooks();
        table.innerHTML = '';
        books.sort((a, b) => a.author.localeCompare(b.author)).forEach(b => table.appendChild(bookToHTML(b)));
    }

    function bookToHTML(book) {
        const editBtn = el('button', 'Edit');
        const deleteBtn = el('button', 'Delete');
        deleteBtn.addEventListener('click', onDelete);
        editBtn.addEventListener('click', onEdit);

        const element = el('tr', [
            el('td', book.title),
            el('td', book.author),
            el('td', book.isbn),
            el('td', [
                editBtn,
                deleteBtn
            ])
        ]);

        return element;

        async function onDelete() {
            try {
                await deleteBook(book.objectId);
                element.remove();
            } catch (err) {
                alert(err);
            }
        }

        async function onEdit() {
            const saveBtn = el('button', 'Save');
            const cancelBtn = el('button', 'Cancel');
            saveBtn.addEventListener('click', () => {
                const author = edit.author.value;
                const title = edit.title.value;
                const isbn = edit.isbn.value;
                const data = { author, title, isbn, objectId: book.objectId };
                
                const element = el('tr', [
                    el('td', author),
                    el('td',  title),
                    el('td', isbn),
                    el('td', [
                        editBtn,
                        deleteBtn
                    ])
                ]);
                table.replaceChild(element, editor);
                updateBook(data);
            });
            cancelBtn.addEventListener('click', () => {
                table.replaceChild(element, editor);
            });

            const edit = {
                title: el('input', null, { type: 'text', value: book.title }),
                author: el('input', null, { type: 'text', value: book.author }),
                isbn: el('input', null, { type: 'text', value: book.isbn }),
            }

            const editor = el('tr', [
                el('td', edit.title),
                el('td', edit.author),
                el('td', edit.isbn),
                el('td', [
                    saveBtn,
                    cancelBtn
                ])
            ]);

            table.replaceChild(editor, element);
        }
    }
});


const applicationId = 'C553691A-C5F0-B1C7-FFD6-2A4EFE22FD00';
const restApiId = 'CA21B720-2B19-478D-937B-6A264CBBD5F5';

function url(end) {
    return `https://api.backendless.com/${applicationId}/${restApiId}/data/${end}`;
}

async function getBooks() {
    const response = await fetch(url('books'));
    const data = await response.json();
    return data;
}

async function createBook(book) {
    const response = await fetch(url('books'), {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function updateBook(book) {
    const id = book.objectId;
    const response = await fetch(url('books/' + id), {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function deleteBook(id) {
    const response = await fetch(url('books/' + id), {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
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