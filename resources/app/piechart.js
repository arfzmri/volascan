let chartData = {}; 

function generatePiechart() {
    console.log("Generating Pie Chart...");
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const inputFilePath = selectedFiles[0];
    closeModal();

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = event.target.result;
        const lines = data.split('\n');

        let totalProcesses = 0;
        const processCounts = {};

        lines.forEach(line => {
            if (line.trim() !== '') {
                totalProcesses++;
                const columns = line.split('\t');
                const imageFileName = columns[2];
                if (imageFileName) {
                    if (processCounts[imageFileName]) {
                        processCounts[imageFileName]++;
                    } else {
                        processCounts[imageFileName] = 1;
                    }
                }
            }
        });

        const labels = Object.keys(processCounts);
        const values = Object.values(processCounts);

        chartData = { labels, values };

        const dataTrace = {
            labels: labels,
            values: values,
            type: 'pie',
            marker: {
                colors: ['rgba(255, 128, 0, 0.6)', 'rgba(0, 128, 255, 0.6)', 'rgba(128, 0, 255, 0.6)', 'rgba(0, 255, 128, 0.6)'] 
            },
            textinfo: 'percent+label', 
            hoverinfo: 'label+percent+value', 
            textposition: 'inside', 
            automargin: true 
        };

        const layout = {
            title: 'Process Distribution by Image File Name',
            width: 700, // Set the width of the chart
            height: 390, // Set the height of the chart
            margin: { t: 30, l: 50, r: 0, b: 0 },
            showlegend: true, // Show legend
            legend: { x: 1, y: 0.5 } // Position legend to the right
        };

        Plotly.newPlot('outputReport', [dataTrace], layout);
        console.log("Pie Chart successfully generated.");
    };

    reader.readAsText(inputFilePath);
}