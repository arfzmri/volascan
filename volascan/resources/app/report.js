function generateSummary() {
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const inputFilePath = selectedFiles[0];

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

        const dataTrace = {
            labels: labels,
            values: values,
            type: 'pie'
	    
        };

        const layout = {
            title: 'Process Distribution by Image File Name',
            width: 700, // Set the width of the chart
    	    height: 390, // Set the height of the chart
	    margin: { t: 30, l: 50, r: 0, b: 0 }
	    
        };

        Plotly.newPlot('outputReport', [dataTrace], layout);
    };

    reader.readAsText(inputFilePath);
}
