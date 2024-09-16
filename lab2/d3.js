const clearButton = document.getElementById("d3-clear-button");
const calculateButton = document.getElementById("d3-calculate-button");
const fInput = document.getElementById("d3-clock-f-input");
const d3Answer = document.getElementById("d3-answer");

clearButton.addEventListener("click", () => {
    fInput.value = ""
    d3Answer.innerHTML = ""
})

calculateButton.addEventListener("click", () => {
    const f = parseInt(fInput.value)
    if (!f) {
        alert("Утга оруулна уу");
        return;
    }

    function formatSeconds(value) {
        const units = [["yottaseconds", Math.pow(10, 24)], ["zettaseconds", Math.pow(10, 21)], ["exaseconds", Math.pow(10, 18)], ["petaseconds", Math.pow(10, 15)], ["teraseconds", Math.pow(10, 12)],["gigaseconds", Math.pow(10, 9)], ["megaseconds", Math.pow(10, 6)], ["kiloseconds", Math.pow(10, 3)], ["seconds", 1], ["milliseconds", Math.pow(10, -3)], ["microseconds", Math.pow(10, -6)],["nanoseconds", Math.pow(10, -9)],["picoseconds", Math.pow(10, -12)],["femtoseconds", Math.pow(10, -15)],["attoseconds", Math.pow(10, -18)],["zeptoseconds", Math.pow(10, -21)], ["yoctoseconds", Math.pow(10, -24)]]

        for (let i = 0; i < units.length; i++) {
            if (value >= units[i][1] || units[i][0] === "yoctoseconds") {
                return `${(value / units[i][1]).toFixed(2)} ${units[i][0]}`;
            }
        }
    }

    console.log(formatSeconds(1 / (f * Math.pow(10, 9))));
    d3Answer.innerHTML = `Хариу: ${formatSeconds(1 / (f * Math.pow(10, 9)))}`

})