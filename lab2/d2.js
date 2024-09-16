const d2ClearButton = document.getElementById("d2-clear-button");
const d2CpiInput = document.getElementById("d2-cpi-number");
const d2InstructionNumberInput = document.getElementById("d2-instruction-number");
const d2InstructionCpiDiv = document.getElementById("instructions-cpi");
const d2CalculateButton = document.getElementById("d2-calculate-button");
const d2AnswerDiv = document.getElementById("d2-answer")

d2ClearButton.addEventListener("click", () => {
    d2CpiInput.value = ""
    d2InstructionNumberInput.value = ""
    d2InstructionCpiDiv.innerHTML = ""
    d2AnswerDiv.innerHTML = ""
})

function getProgramName(i) {
    const alphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const pres = Math.floor(i / 26); // Number of times we go over the alphabet
    const itself = i % 26; // The index in the alphabet

    // Generate the name based on pres and itself
    if (pres === 0) {
        return alphas[itself]; // If pres is 0, we just return the corresponding letter
    }

    return alphas[pres - 1] + alphas[itself]; 
}


d2InstructionNumberInput.addEventListener("change", (e) => {
    d2InstructionCpiDiv.innerHTML = ""

    const num = e.target.value

    for (let i = 0; i < num; i++) {
        const containerDiv = document.createElement("div");
        
        const newS = `
            <label for="d2-program-${i}-cpi-input">Програм ${getProgramName(i)} CPI</label>
            <input type="number" id="d2-program-${i}-cpi-input" />
            <br>
            <br>
        `

        containerDiv.innerHTML = newS

        d2InstructionCpiDiv.appendChild(containerDiv);
    }

    const instructionOrder = `
        <textarea id="instructions-order-textarea" placeholder="Заавруудын дарааллыг таслалаар зааглан бичнэ үү"></textarea>
    `

    d2InstructionCpiDiv.innerHTML += instructionOrder
})


d2CalculateButton.addEventListener("click", () => {
    const cpuCPI = parseInt(d2CpiInput.value);
    const instructionNum = d2InstructionNumberInput.value;
    if (!cpuCPI || !instructionNum) {
        alert("Утгуудыг бүрэн бөглөнө үү");
        return;
    }

    const instructions = {}

    for (let i = 0; i < parseInt(instructionNum); i++) {
        const ithInst = parseInt(document.getElementById(`d2-program-${i}-cpi-input`).value)

        if (!ithInst) {
            alert("Утгуудыг бүрэн бөглөнө үү");
            return;
        }

        instructions[getProgramName(i)] = ithInst
    }

    const orderString = document.getElementById("instructions-order-textarea").value;
    if (!orderString) {
        alert("Дарааллыг оруулна уу");
        return;
    }

    const order = orderString.split(",").map(item => item.trim());

    if (!order.length) {
        alert("Дараалал буруу байна");
        return;
    }

    let totalCPI = 0

    for (let i = 0; i < order.length; i++) {
        if (!instructions[order[i]]) {
            alert("Дараалал буруу байна");
            return;
        }

        totalCPI += instructions[order[i]]
    }


    d2AnswerDiv.innerHTML = `Хариу: ${totalCPI * cpuCPI} наносекунд`

})