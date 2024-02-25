document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async() => {
    try {
        // console.log("obteniendo datos")
        loadingData(true)
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json();

        printCard(data);

    } catch (error) {
        console.log(error)
    } finally {
        loadingData(false);
    }
};

const printCard = (data) => {
    // console.log(data)
    const cards = document.getElementById('card-dinamicas');
    const templateCard = document.getElementById('template-card').content
    const fragment = document.createDocumentFragment()

    data.results.forEach((item) => {
        // console.log(item);
        const clone = templateCard.cloneNode(true);
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("p").textContent = item.species;
        clone.querySelector(".card-img-top").setAttribute("src", item.image);

        // guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);

};

// loading 

const loadingData = estado => {
    const loading = document.querySelector('#loading');
    estado == true ? loading.classList.remove('d-none') : loading.classList.add('d-none')

}