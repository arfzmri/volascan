function filterDataByWow64() {
    closeModal();

    const wow64Value = document.querySelector('input[name="wow64"]:checked').value;

    const tableRows = document.querySelectorAll('.outputTable tr');

    tableRows.forEach(row => {

        if (row.classList.contains('headerRow')) return;

        const wow64Cell = row.querySelector('.wow64Column');

        if (wow64Cell) {

            const rowWow64 = wow64Cell.textContent;

            if (rowWow64.toLowerCase() === wow64Value.toLowerCase()) {
                row.style.display = 'table-row'; // Show the row
            } else {
                row.style.display = 'none'; // Hide the row
            }
        } else {

            console.error('Wow64 column not found in row:', row);
        }
    });
}
