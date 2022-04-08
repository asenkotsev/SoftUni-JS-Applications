function attachEvents() {
    const baseUrl = 'http://localhost:8000/messenger';
    const nameInput = document.getElementById('author');
    const messageInput = document.getElementById('content');
    const submitInput = document.getElementById('submit');
    const refreshInput = document.getElementById('refresh');
    const messagesTextArea = document.getElementById('messages');

    submitInput.addEventListener('click', submit);
    refreshInput.addEventListener('click', refresh);

    function submit() {
        const author = nameInput.value;
        const content = messageInput.value;
        const data = { author, content };
        
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
        nameInput.value = '';
        messageInput.value = '';
    };
    function refresh() {
        
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                let res = '';
                Object.keys(data).forEach(key => {
                    res += `${data[key].author}: ${data[key].content}\n`;
                });
                messagesTextArea.textContent = res;
            })
    }
}

attachEvents();