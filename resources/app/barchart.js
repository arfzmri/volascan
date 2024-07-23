function generateBarchart() {
    console.log("Generating Bar Chart...");
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const inputFilePath = selectedFiles[0];
    closeModal();

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = event.target.result;
        const lines = data.split('\n');

        let totalProcesses = 0;
        const uniqueImageFileNames = new Set();
        const processCounts = {};

        lines.forEach(line => {
            if (line.trim() !== '') {
                totalProcesses++;
                const columns = line.split('\t');
                const imageFileName = columns[2];
                if (imageFileName) {
                    uniqueImageFileNames.add(imageFileName);
                    if (processCounts[imageFileName]) {
                        processCounts[imageFileName]++;
                    } else {
                        processCounts[imageFileName] = 1;
                    }
                }
            }
        });

        const imageFileNames = Array.from(uniqueImageFileNames);
        const processCountsData = imageFileNames.map(name => processCounts[name]);

        const dataTrace = {
            x: imageFileNames,
            y: processCountsData,
            type: 'bar',
            marker: {
                color: 'rgb(57, 106, 177)'
            }
        };

        const layout = {
            title: 'Process Counts by Image File Name',
            xaxis: { title: 'Image File Name', tickfont: { size: 14 } },
            yaxis: { title: 'Process Count', tickfont: { size: 14 } }, 
            font: { family: 'Arial, sans-serif', size: 16 }, 
            margin: { t: 60, l: 60, r: 60, b: 80 }, 
            plot_bgcolor: 'rgba(0,0,0,0)', 
            paper_bgcolor: 'rgba(255,255,255,0.8)', 
        };

        Plotly.newPlot('outputReport', [dataTrace], layout);
	console.log("Bar Chart successfully generated.");
    };

    reader.readAsText(inputFilePath);
}
