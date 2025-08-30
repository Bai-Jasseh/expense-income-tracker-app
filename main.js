// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Step 1: Grab the table where entries will appear
    let entriesTable = document.querySelector(".entries");

    // Step 2: Grab the button that adds a new entry
    let newEntryBtn = document.querySelector(".new-entry");

    // Step 3: Grab the place where we show the total balance
    let totalField = document.querySelector(".total");

    // Step 4: Function to calculate total balance
    function updateTotal() {
        let total = 0;

        // Grab all the rows in the table
        let rows = entriesTable.querySelectorAll("tr");

        // Go through each row one by one
        rows.forEach(function(row) {
            // Grab the type (income or expense) from that row
            let typeInput = row.querySelector(".input-type");
            let type = "";
            if (typeInput) {
                type = typeInput.value;
            }

            // Grab the amount from that row
            let amountInput = row.querySelector(".input-amount");
            let amount = 0;
            if (amountInput) {
                amount = parseFloat(amountInput.value);
                if (isNaN(amount)) { // if user didn't type anything
                    amount = 0;
                }
            }

            // Update total based on income or expense
            if (type === "income") {
                total = total + amount;
            } else if (type === "expense") {
                total = total - amount;
            }
        });

        // Show total in the total field
        totalField.textContent = "D" + total.toFixed(2);
    }

    // Step 5: Function to add a new row to the table
    function addEntry() {
        // Create a new row
        let row = document.createElement("tr");

        // Put inputs and a delete button inside the row
        row.innerHTML = `
            <td><input class="input input-date" type="date"></td>
            <td><input class="input input-description" type="text" placeholder="Add a description (eg. wages, bills, etc)"></td>
            <td>
                <select class="input input-type">
                    <option value="income">income</option>
                    <option value="expense">expense</option>
                </select>
            </td>
            <td><input type="number" class="input input-amount"></td>
            <td><button type="button" class="delete-entry">&#10005;</button></td>
        `;

        // Add the row to the table
        entriesTable.appendChild(row);
    }

    // Step 6: When user clicks "New Entry" button, add a row
    newEntryBtn.addEventListener("click", function() {
        addEntry();
    });

    // Step 7: When user types in inputs, recalculate total
    entriesTable.addEventListener("input", function() {
        updateTotal();
    });

    // Step 8: When user clicks a delete button, remove that row and recalc total
    entriesTable.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-entry")) {
            // Remove the whole row where the delete button is
            let rowToDelete = e.target.parentNode.parentNode;
            entriesTable.removeChild(rowToDelete);

            // Update total after deletion
            updateTotal();
        }
    });

    // Step 9: Calculate total initially in case table already has rows
    updateTotal();

});
