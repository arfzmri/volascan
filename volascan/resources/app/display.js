function displayData() {
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const inputFilePath = selectedFiles[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = event.target.result;
        const lines = data.split('\n');

        let outputHTML = '<table>'; 

        // Header row
        outputHTML += '<tr>';
        const headers = lines[0].split('\t');
        headers.forEach(header => {
            outputHTML += `<th>${header}</th>`;
        });
        outputHTML += '</tr>';

        // Data rows
        for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split('\t');
            outputHTML += '<tr>';
            columns.forEach(column => {
                outputHTML += `<td>${column}</td>`; 
            });
            outputHTML += '</tr>';
        }

        outputHTML += '</table>';

        // Display the data in an HTML element with id 'outputData'
        document.getElementById('outputData').innerHTML = outputHTML;
    };

    reader.readAsText(inputFilePath);
}
