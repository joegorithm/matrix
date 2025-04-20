const matrixA = document.getElementById("matrix-a");
const matrixB = document.getElementById("matrix-b");
const matrixResult = document.getElementById("matrix-result");

if (matrixA.rows[0].cells[0].querySelector("input").value) {
    console.log(matrixA.rows[0].cells[0].querySelector("input").value);
}

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
    // console.log("All elements have values");
    
    // Call the function to calculate the result
    for (let i = 0; i < matrixResult.rows.length; i++) {
        for (let j = 0; j < matrixResult.rows[i].cells.length; j++) {
            let element = 0;
            for (let k = 0; k < matrixA.rows[i].cells.length; k++) {
                const valueA = parseFloat(matrixA.rows[i].cells[k].querySelector("input").value);
                const valueB = parseFloat(matrixB.rows[k].cells[j].querySelector("input").value);
                element += valueA * valueB;
                // console.log(element);
            }
            matrixResult.rows[i].cells[j].querySelector("input").value = element;
        }
    }
}

updateResult();




// When "add-column" button is clicked for each matrix, add a new column in matrix table
const addColumnButtons = document.querySelectorAll(".add-column");
addColumnButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Find the associated table using the data-target attribute
        const matrixId = button.closest(".matrix-container").querySelector("table").id;
        const matrix = document.getElementById(matrixId);

        if (!matrix) {
            console.error("No associated table found for the button.");
            return;
        }

        const numRows = matrix.rows.length;
        for (let i = 0; i < numRows; i++) {
            const newCell = matrix.rows[i].insertCell(matrix.rows[i].cells.length);
            const input = document.createElement("input");
            input.type = "number"; // Ensure the input type is consistent
            input.classList.add("matrix-element"); // Add the appropriate class
            newCell.appendChild(input);
        }

        // Add a new column in the result matrix if matrix B is modified
        if (matrixId === "matrix-b") {
            const NumRowsA = matrixA.rows.length;
            for (let i = 0; i < NumRowsA; i++) {
                const matrixResultCell = matrixResult.rows[i].insertCell(matrixResult.rows[i].cells.length);
                const resultInput = document.createElement("input");
                resultInput.type = "number"; // Ensure the input type is consistent
                resultInput.classList.add("matrix-element"); // Add the appropriate class
                resultInput.readOnly = true; // Make result cells read-only
                matrixResultCell.appendChild(resultInput);
            }
        }

        verifySize();

    });
});

// When "remove-column" button is clicked for each matrix, remove the last column in matrix table
const removeColumnButtons = document.querySelectorAll(".remove-column");
removeColumnButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // Find the associated table using the data-target attribute
        const matrixId = button.closest(".matrix-container").querySelector("table").id;
        const matrix = document.getElementById(matrixId);

        if (!matrix) {
            console.error("No associated table found for the button.");
            return;
        }

        const numRows = matrix.rows.length;
        for (let i = 0; i < numRows; i++) {
            if (matrix.rows[i].cells.length > 0) {
                matrix.rows[i].deleteCell(matrix.rows[i].cells.length - 1);
            }
        }

        // Remove the last column from the result matrix if matrix B is modified
        if (matrixId === "matrix-b") {
            const numRowsA = matrixA.rows.length;
            for (let i = 0; i < numRowsA; i++) {
                matrixResult.rows[i].deleteCell(matrixResult.rows[i].cells.length - 1);
            }
        }

        verifySize();

    });
});

// When "add-row" button is clicked for each matrix, add a new row in matrix table
const addRowButtons = document.querySelectorAll(".add-row");
addRowButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // Find the associated table using the closest matrix-container and its child table
        const matrixContainer = button.closest(".matrix-outer-container");
        const matrix = matrixContainer.querySelector("table");

        if (!matrix) {
            console.error("No associated table found for the button.");
            return;
        }

        const newRow = matrix.insertRow(matrix.rows.length);
        const numCols = matrix.rows[0].cells.length;

        for (let j = 0; j < numCols; j++) {
            const newCell = newRow.insertCell(j);
            const input = document.createElement("input");
            input.type = "number"; // Ensure the input type is consistent
            input.classList.add("matrix-element"); // Add the appropriate class
            newCell.appendChild(input);
        }

        // Add a new row in the result matrix if matrix A is modified
        if (matrix.id === "matrix-a") {
            const numColsB = matrixB.rows[0]?.cells.length || 0;
            const newResultRow = matrixResult.insertRow(matrixResult.rows.length);
            for (let k = 0; k < numColsB; k++) {
                const matrixResultCell = newResultRow.insertCell(k);
                const resultInput = document.createElement("input");
                resultInput.type = "number"; // Ensure the input type is consistent
                resultInput.classList.add("matrix-element"); // Add the appropriate class
                resultInput.readOnly = true; // Make result cells read-only
                matrixResultCell.appendChild(resultInput);
            }
        }
        
        verifySize();
    });
});

// When "remove-row" button is clicked for each matrix, remove the last row in matrix table
const removeRowButtons = document.querySelectorAll(".remove-row");
removeRowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Find the associated table using the closest matrix-container and its child table
        const matrixContainer = button.closest(".matrix-outer-container");
        const matrix = matrixContainer.querySelector("table");

        if (!matrix) {
            console.error("No associated table found for the button.");
            return;
        }

        if (matrix.rows.length > 0) {
            matrix.deleteRow(matrix.rows.length - 1);
        }

        // Remove the last row from the result matrix if matrix A is modified
        if (matrix.id === "matrix-a") {
            matrixResult.deleteRow(matrixResult.rows.length - 1);
        }

        verifySize();
    });
});

function verifySize() {
    const numRowsA = matrixA.rows.length;
    const numColsA = matrixA.rows[0]?.cells.length || 0;
    const numRowsB = matrixB.rows.length;
    const numColsB = matrixB.rows[0]?.cells.length || 0;

    if (numColsA !== numRowsB) {
        console.error("Matrix multiplication is not possible: Columns of A must match rows of B.");
        errorMessage("Matrix multiplication requires the number of colums in the first matrix to equal the number of rows in the second matrix.");
        return false;
    }

    clearErrorMessage();
    return true;
}

function errorMessage(message) {
    const errorMessageBanner = document.querySelector(".error-message-banner");
    const errorMessage = document.getElementById("error-message");
    errorMessageBanner.style.display = "flex";
    errorMessage.textContent = message;
}
function clearErrorMessage() {
    const errorMessageBanner = document.querySelector(".error-message-banner");
    const errorMessage = document.getElementById("error-message");
    errorMessageBanner.style.display = "none"; // Hide the banner
    errorMessage.textContent = ""; // Clear the message content
}


// Determine number of "matrix-results" matrix table elements based on dimentions of matrix A and B

// const numRowsA = matrixA.rows.length;
// const numColsA = matrixA.rows[0].cells.length;
// const numRowsB = matrixB.rows.length;
// const numColsB = matrixB.rows[0].cells.length;
// const numRowsResult = numRowsA;
// const numColsResult = numColsB;

// function updateMatrixResultDimensions() {
//     const numRowsA = matrixA.rows.length;
//     const numColsA = matrixA.rows[0]?.cells.length || 0;
//     const numRowsB = matrixB.rows.length;
//     const numColsB = matrixB.rows[0]?.cells.length || 0;

//     if (numColsA !== numRowsB) {
//         console.error("Matrix multiplication is not possible: Columns of A must match rows of B.");
//         return;
//     }

//     const numRowsResult = numRowsA;
//     const numColsResult = numColsB;

//     // Clear existing rows in matrixResult
//     while (matrixResult.rows.length > 0) {
//         matrixResult.deleteRow(0);
//     }

//     for (let i = 0; i < numRowsResult; i++) {
//         const newRow = matrixResult.insertRow(i);
//         for (let j = 0; j < numColsResult; j++) {
//             const newCell = newRow.insertCell(j);
//             const input = document.createElement("input");
//             input.type = "number"; // Ensure the input type is consistent
//             input.classList.add("matrix-element"); // Add the appropriate class
//             input.readOnly = true; // Make result cells read-only
//             newCell.appendChild(input);
//         }
//     }
// }

// updateMatrixResultDimensions();



// querySelectorAll(".matrix").forEach((element) => {
//     element.addEventListener("button", (event) => {
//         console.log("Hello");
//         const button = event.target;
//         const matrix = button.parentElement.parentElement;
//         const newRow = matrix.insertRow(matrix.rows.length);
//         const numCols = matrix.rows[0].cells.length;
//     });
// });

