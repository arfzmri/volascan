function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector('.outputTable');
    const rows = table.querySelectorAll('tr');
    const headerRow = rows[0]; 

    rows.forEach(row => {
        let found = false;
        row.querySelectorAll('td').forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                found = true;
            }
        });
        if (found || row === headerRow) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.getElementById('searchButton').addEventListener('click', performSearch);

