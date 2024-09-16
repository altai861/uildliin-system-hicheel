const d1ClearButton = document.getElementById("d1-clear-button");
const d1CPUNumberInput = document.getElementById("d1-cpu-number-input");
const d1ProgramNumberInput = document.getElementById("d1-program-number-input");
const d1ProgramDurationInputsDiv = document.getElementById("d1-program-duration-inputs");
const d1CalculateButton = document.getElementById("d1-calculate-button");
const d1AnswerDiv = document.getElementById("d1-answer");

function findPermutations(arr) {
    function backtrack(start) {
        // If we've reached the end, we've found a permutation
        if (start === arr.length) {
            result.push([...arr]); // Add a copy of the current permutation
        }
        for (let i = start; i < arr.length; i++) {
            // Swap the current element with the start element
            [arr[start], arr[i]] = [arr[i], arr[start]];
            // Recursively call to generate permutations from the next index
            backtrack(start + 1);
            // Backtrack: swap back to the original configuration
            [arr[start], arr[i]] = [arr[i], arr[start]];
        }
    }

    const result = [];
    backtrack(0);
    return result;
}


function findAnswer(entry, cpuNumber) {
    let result = []
    for (let i = 0; i < cpuNumber; i++) {
        result.push(0)
    }
    let count = 0
    for (let i = 0; i < entry.length; i++) {
        result[count] += entry[i]
        count++;
        if (count === cpuNumber) {
            count = 0;
        }
    }
    return result
}

d1ClearButton.addEventListener("click", () => {
    d1CPUNumberInput.value = "";
    d1ProgramNumberInput.value = "";
    d1ProgramDurationInputsDiv.innerHTML = "";
    d1AnswerDiv.innerHTML = ""
})

d1ProgramNumberInput.addEventListener("change", () => {
    const count = parseInt(d1ProgramNumberInput.value);
    d1ProgramDurationInputsDiv.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const containerDiv = document.createElement("div");
        
        const newS = `
            <label for="d1-program-${i}-duration-input">Програм ${i + 1} (msec)</label>
            <input type="number" id="d1-program-${i}-duration-input" />
            <br>
            <br>
        `

        containerDiv.innerHTML = newS

        d1ProgramDurationInputsDiv.appendChild(containerDiv);
    }
})

d1CalculateButton.addEventListener("click", () => {
    const cpuNumber = d1CPUNumberInput.value;
    const programNumber = d1ProgramNumberInput.value;
    if (!cpuNumber || !programNumber) {
        alert("Утгаадыг гүйцэд оруулна уу");
        return
    }

    const programDurations = []

    for (let i = 0; i < parseInt(programNumber); i++) {
        const ithDuration = document.getElementById(`d1-program-${i}-duration-input`).value;
        if (!ithDuration) {
            alert(`${i + 1} дүгээр программын хугацааг оруулна уу`);
            return;
        }
        programDurations.push(parseInt(ithDuration));
    }


    const ways = findPermutations(programDurations);
    console.log(ways)

    const table = document.createElement("table");
    table.border = 1;
    let tableContent = '<tr><td></td>';  // Start with an empty first <td>

    // Loop to create the required <td> with "CPU {number}" inside
    for (let i = 1; i <= parseInt(cpuNumber); i++) {
        tableContent += `<td>CPU ${i}</td>`;
    }

    tableContent += '</tr>';  // Close the row

    const eachEntryRow = Math.ceil(parseInt(programNumber) / parseInt(cpuNumber)) + 1;

    let theRealAnswers = []

    for (let i = 0; i < ways.length; i++) {
        let count = 0
        for (let j = 0; j < eachEntryRow; j++) {
            let newRow = "<tr>"
            if (j === 0) {
                const head = `<td rowspan="${eachEntryRow}">${'Entry ' + (i + 1)}</td>`
                newRow += head;
                let rest = ''
                for (let k = 0; k < parseInt(cpuNumber); k++) {
                    rest += `<td>${ways[i][count] || ''}</td>`
                    count++;
                }
                newRow += rest;
                newRow += "</tr>"
            } else if (j === eachEntryRow - 1) {
                let answer = findAnswer(ways[i], parseInt(cpuNumber));
                let the_real_answer = Math.max(...answer);
                if (theRealAnswers.indexOf(the_real_answer) === -1) {
                    theRealAnswers.push(the_real_answer);
                }
                let rest = ''
                for (let k = 0; k < answer.length; k++) {
                    rest += `<td class="${answer[k] === the_real_answer ? 'the_real_answer' : 'answer'}">${answer[k]}</td>`
                }
                newRow += rest;
                newRow += "</tr>"
            } else {
                let rest = ''
                for (let k = 0; k < parseInt(cpuNumber); k++) {
                    rest += `<td>${ways[i][count] || ''}</td>`
                    count++;
                }
                newRow += rest;
                newRow += "</tr>"
            }
            tableContent += newRow
        }
    }

    console.log(theRealAnswers)

    table.innerHTML = tableContent; 
    d1AnswerDiv.innerHTML += `
        <ol>
            ${ways.map(way => `<li>${way}</li>`).join('')}
        </ol>
    `;
    d1AnswerDiv.appendChild(table)
    d1AnswerDiv.innerHTML += `
        <p>Хариу: ${theRealAnswers} milliseconds </p>
    `
})