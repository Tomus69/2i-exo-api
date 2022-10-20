export default function getAddress() {
    const address = document.querySelector("#inputAddress");
    const list = document.querySelector("#datalistOptions");
    
    address.addEventListener('input', (e) => {
        e.preventDefault();
        const enteredValue = e.currentTarget.value;
        if (enteredValue.length < 4) return;
        list.innerHTML = '';
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${enteredValue}&limit=5`)
            .then((response) => {
                if (response.ok) {                
                    response.json().then((res) => {
                        res.features.forEach((feature) => {
                            const label = feature.properties.label;
                            const option = document.createElement("option");
                            option.setAttribute("value", label);
                            option.innerHTML = label;
                            list.appendChild(option);
                        });
                    });
                }
            });
    });
}
