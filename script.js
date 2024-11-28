const items = [
    { name: "ABELIDA", chance: 2.94 },
    { name: "ANTONIO", chance: 0.33 },
    { name: "ARRAJI", chance: 0.44 },
    { name: "BALAGTAS", chance: 4.88 },
    { name: "BICLAR", chance: 2.11 },
    { name: "BISCOCHO", chance: 1.94 },
    { name: "BUHAY", chance: 1.94 },
    { name: "CANDELARIO", chance: 2.94 },
    { name: "CHIN", chance: 0.33 },
    { name: "CORTEZANO", chance: 3.67 },
    { name: "DAGUPLO", chance: 1.94 },
    { name: "ESCAÑO", chance: 0.89 },
    { name: "ESTRELLA", chance: 3.89 },
    { name: "FIRMANES", chance: 2.94 },
    { name: "FLORA", chance: 1.72 },
    { name: "LANUZO", chance: 1.72 },
    { name: "MANGOBA", chance: 0.44 },
    { name: "MAYRINA", chance: 2.94 },
    { name: "MERCADO", chance: 1.50 },
    { name: "MERGAL", chance: 2.11 },
    { name: "MONTALBAN", chance: 3.28 },
    { name: "OPINIANO", chance: 3.50 },
    { name: "OÑATE", chance: 1.50 },
    { name: "PASCUA", chance: 2.33 },
    { name: "PASCUAL", chance: 1.50 },
    { name: "RAMIREZ", chance: 0.89 },
    { name: "RANGEL", chance: 1.72 },
    { name: "ROSALES", chance: 1.50 },
    { name: "SALVADOR", chance: 2.11 },
    { name: "SANCHEZ", chance: 2.33 },
    { name: "SANTOS", chance: 1.94 },
    { name: "TUMOLVA", chance: 0.89 },
    { name: "TURGO", chance: 2.11 },
    { name: "URDANETA", chance: 1.50 },
    { name: "VALENCIA", chance: 1.72 },
    { name: "VASQUEZ, A.", chance: 2.72 },
    { name: "VASQUEZ, D.", chance: 4.56 },
    { name: "VENTURA", chance: 2.72 },
];

let remainingItems = [...items];
const resultText = document.getElementById("resultText");
const remainingItemsList = document.getElementById("remainingItems");
const modal = document.getElementById("modal");
const randomName = document.getElementById("randomName");
const finalResult = document.getElementById("finalResult");
const closeModalButton = document.getElementById("closeModalButton");

/**
 * Updates the chances of the remaining items proportionally.
 */
function updateChances() {
    const totalChance = remainingItems.reduce((sum, item) => sum + item.chance, 0);
    remainingItems = remainingItems.map(item => ({
        ...item,
        chance: (item.chance / totalChance) * 100,
    }));
}

/**
 * Updates the display of remaining items and their chances in the list.
 */
function updateRemainingItemsDisplay() {
    remainingItemsList.innerHTML = "";
    remainingItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.chance.toFixed(2)}%)`;
        remainingItemsList.appendChild(li);
    });
}

/**
 * Selects a random item based on their weighted chances.
 */
function getRandomItem() {
    const totalChance = remainingItems.reduce((sum, item) => sum + item.chance, 0);
    const random = Math.random() * totalChance;
    let cumulativeChance = 0;

    for (const item of remainingItems) {
        cumulativeChance += item.chance;
        if (random <= cumulativeChance) {
            return item;
        }
    }
    return null;
}

/**
 * Starts the random selection process and updates the modal with the result.
 */
document.getElementById("startButton").addEventListener("click", () => {
    if (remainingItems.length === 0) {
        resultText.textContent = "All students have been drawn! Press 'Reset' to start over.";
        return;
    }

    modal.style.display = "flex";
    randomName.style.display = "block";
    finalResult.style.display = "none";
    closeModalButton.style.display = "none";

    let interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * remainingItems.length);
        randomName.textContent = remainingItems[randomIndex].name;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        const drawnItem = getRandomItem();
        if (drawnItem) {
            randomName.style.display = "none";
            finalResult.textContent = `Lucky student is: ${drawnItem.name}`;
            finalResult.style.display = "block";
            closeModalButton.style.display = "inline-block";
            remainingItems = remainingItems.filter(item => item !== drawnItem);
            updateChances();
            updateRemainingItemsDisplay();
            resultText.textContent = `Lucky student is: ${drawnItem.name} (${drawnItem.chance.toFixed(2)}%)`;
        }
    }, 3000);
});

/**
 * Closes the modal when the "Nice" button is clicked.
 */
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

/**
 * Resets the selection process and updates the list display.
 */
document.getElementById("resetButton").addEventListener("click", () => {
    remainingItems = [...items];
    resultText.textContent = "Press 'Start' to get a random student!";
    updateChances();
    updateRemainingItemsDisplay();
});

// Initialize the display
updateChances();
updateRemainingItemsDisplay();
