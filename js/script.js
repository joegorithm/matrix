const matrixA = document.getElementById("matrix-a");
const matrixB = document.getElementById("matrix-b");
const matrixResult = document.getElementById("matrix-result");

if (matrixA.rows[0].cells[0].querySelector("input").value) {
    console.log(matrixA.rows[0].cells[0].querySelector("input").value);
}

// console.log(matrixA.rows[0].cells[0].querySelector("input").value);

matrixA.addEventListener("input", (event) => {
    if (event.target.tagName === "INPUT") {
        updateResult();
    }
});

matrixB.addEventListener("input", (event) => {
    if (event.target.tagName === "INPUT") {
        updateResult();
    }
});

function updateResult() {
    // const row = event.target.parentElement.parentElement.rowIndex;
    // const col = event.target.parentElement.cellIndex;
    // const value = event.target.value;
    // console.log(row, col, value);

    // let allFilled = true;

    // for (let i = 0; i < matrixA.rows.length; i++) {
    //     for (let j = 0; j < matrixA.rows[i].cells.length; j++) {
    //         const input = matrixA.rows[i].cells[j].querySelector("input");
    //         if (input.value === "") {
    //             allFilled = false;
    //             break;
    //         }
    //     }
    // }

    // if (allFilled) {
        console.log("All elements have values");
        
        // Call the function to calculate the result
        for (let i = 0; i < matrixResult.rows.length; i++) {
            for (let j = 0; j < matrixResult.rows[i].cells.length; j++) {
                let element = 0;
                for (let k = 0; k < matrixA.rows[i].cells.length; k++) {
                    const valueA = parseFloat(matrixA.rows[i].cells[k].querySelector("input").value);
                    const valueB = parseFloat(matrixB.rows[k].cells[j].querySelector("input").value);
                    element += valueA * valueB;
                    console.log(element);
                }
                matrixResult.rows[i].cells[j].querySelector("input").value = element;
            }
        }
    // }
}

updateResult();