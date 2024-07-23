function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function readOutput() {
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const inputFilePath = selectedFiles[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = event.target.result;
        const lines = data.split('\n');

        // Create a table element
        const table = document.createElement('table');
        table.classList.add('outputTable');

        // Parse and display data rows
        lines.forEach((line, index) => {
            if (line.trim() !== '') {
                if (index === 0) { 
                    return;
                }
                const columns = line.split('\t');
                const row = document.createElement('tr');
                columns.forEach(columnText => {
                    const cell = document.createElement('td');
                    cell.textContent = columnText;
                    row.appendChild(cell);
                });
                table.appendChild(row);
            }
        });

        const outputReport = document.getElementById('outputData');
        outputReport.innerHTML = '';
        outputReport.appendChild(table);
    };

    reader.readAsText(inputFilePath);
}
