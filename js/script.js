// prendo la griglia
const gridElement = document.querySelector("#grid");

// funzione che genera un numero random
function generateRandomNumber(maxNumber) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    // restituisco il numero generato
    return randomNumber;
}

//creo una function che generi un array di 100 numeri
function getRandomNumbersArray(maxNumber) {
    const numbersArray = [];
  
    while (numbersArray.length < maxNumber) {
        //inserisco il numero solo se non è già presente
        const newNumber = generateRandomNumber(maxNumber);

        //controllo se il numero appena generato è già presente dentro il nostro array
        if( ! numbersArray.includes(newNumber) ) {
            numbersArray.push(newNumber);
        }

    }
  
    return numbersArray;
}

// Creo la select con 3 livelli di difficoltà
const selectElement = document.createElement("select");
selectElement.innerHTML = `
  <option value="1">Easy</option>
  <option value="2">Medium</option>
  <option value="3">Hard</option>
`;

//aggiungo la select a sinistra del titolo
document.querySelector(".container-fluid").prepend(selectElement);

//mostro la griglia
document.querySelector("#container").style.display = "flex";

document.querySelector("#play").addEventListener("click", function() {
    //mi salvo una const per prendere il valore dell'elemento select
    const difficultyLevel = selectElement.value;

    // Pulisco la griglia
    gridElement.innerHTML = "";

    //elimino le classi del container
    document.querySelector("#container").className = "";

    // Determino la dimensione della griglia in base alla difficoltà
    let gridSize;
    switch(difficultyLevel) {
        case '1':
            gridSize = 100; // 10x10
            break;
        case '2':
            gridSize = 81; // 9x9
            break;
        case '3':
            gridSize = 49; // 7x7
            break;
        default:
            console.log('Difficoltà non supportata');
            return;
    }

    //salvo un array di numeri casuali
    const randomNumbersArray = getRandomNumbersArray(gridSize);

    // creo la griglia
    for(let i = 0; i < gridSize; i++) {
        // creo un elemento, gli metto la classe "square" e lo aggiungo nella griglia
        const newElement = document.createElement("div");
        newElement.classList.add("square");
        newElement.innerText = randomNumbersArray[i];

        //in base alla difficoltà visualizzo una griglia diversa tramite le classi container
        if(difficultyLevel == "1") {
            document.querySelector("#container").classList.add("container")

        } else if(difficultyLevel == "2") {
            document.querySelector("#container").classList.add("container-second")

        } else {
            document.querySelector("#container").classList.add("container-third")
        }
                
        //aggiungo un event listener ad ogni quadrato che aggiungo
        newElement.addEventListener("click", function() {
            //con this seleziono lo square e aggiungo o tolgo la class active
            this.classList.toggle("active");
        });
        
        gridElement.append(newElement);
    }






});
