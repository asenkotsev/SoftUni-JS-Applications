window.addEventListener('load', () => {
    document.getElementById('btnLoadTowns').addEventListener('click', onLoad);
    const rootDiv = document.getElementById('root');
    const townsInput = document.getElementById('towns');

    const templateString = document.getElementById('main-template').innerHTML;
    const templateFunction = Handlebars.compile(templateString);

    function onLoad(e) {
        e.preventDefault();
        const towns = townsInput.value.split(', ');
        const generatedHTML = templateFunction({ towns });

        rootDiv.innerHTML = generatedHTML;
    }
})