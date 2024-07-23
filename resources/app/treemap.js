function generateTreemap() {
    console.log("Generating Tree Map...");
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

        const treemapData = {
            name: "root",
            children: Object.entries(processCounts).map(([label, value]) => ({ name: label, value }))
        };

        const width = 700;
        const height = 390;

        const svg = d3.select("#outputReport")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        svg.append("defs").html('<filter id="drop-shadow" x="-20%" y="-20%" width="150%" height="150%"><feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" /><feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" /></filter>');

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const treemap = d3.treemap()
            .size([width, height])
            .padding(0)
            .round(true);

        const root = d3.hierarchy(treemapData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        treemap(root);

        const rects = svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => Math.max(0, d.x1 - d.x0))
            .attr("height", d => Math.max(0, d.y1 - d.y0))
            .attr("fill", (d, i) => {
                const color = colorScale(d.data.name);
                d.originalColor = color; 
                return "url(#gradient_" + i + ")";
            })
            .attr("stroke", "none")
            .style("filter", "url(#drop-shadow)") 
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(event, d) {
            const darkerColor = d3.color(d.originalColor).darker(1.0); 

            const processName = d.data.name;
            const processCount = d.data.value;
            const percentage = ((processCount / totalProcesses) * 100).toFixed(2);

            d3.select(this)
                .append("title")
                .text(processName + "\nCount: " + processCount + "\nPercentage: " + percentage + "%");

            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", darkerColor); 
        }

        function handleMouseOut() {
            const originalColor = d3.select(this).datum().originalColor; 

            d3.select(this).select("title").remove();

            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", originalColor); 
        }

        const gradient = svg.append("defs")
            .selectAll("linearGradient")
            .data(root.leaves())
            .enter()
            .append("linearGradient")
            .attr("id", (d, i) => "gradient_" + i)
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%");
        
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => d.originalColor)
            .attr("stop-opacity", 1);
        
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => d3.color(d.originalColor).darker(0.5))
            .attr("stop-opacity", 1);
    };
    console.log("Tree Map successfully generated.");
    reader.readAsText(inputFilePath);
}
