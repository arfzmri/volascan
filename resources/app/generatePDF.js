// Define function to generate PDF
export function generatePDF() {
    // Run all chart generation functions
    generateBarchart();
    generatePiechart();
    generateTreemap();


    setTimeout(() => {

        html2canvas(document.body).then(canvas => {
            // Initialize jsPDF
            const pdf = new jsPDF();

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);

            pdf.save('report.pdf');
        });
    }, 100); 
}
