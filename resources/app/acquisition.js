function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function openErrorModal() {
    document.getElementById('errorModal').style.display = 'flex';
}

function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}

function executeWinPmem() {
    const path = require('path');
    const { exec } = require('child_process');
    const currentDirectory = __dirname;

    const fileName = document.getElementById('fileName').value.trim();
    const outputPath = document.getElementById('outputPath').value.trim();
    const fileType = document.querySelector('input[name="fileType"]:checked')?.value;

    if (!fileName || !outputPath || !fileType) {
        openErrorModal();
        return;
    }

    const loader = document.querySelector('.loader-acq');
    loader.style.display = 'block';

    const outputElement = document.getElementById('outputAcquisition');
    outputElement.innerHTML = ''; // Clear previous output

    console.log('Creating memory image...');
    outputElement.innerHTML += 'Creating memory image...<br>';

    const winpmemPath = path.join(currentDirectory, 'src', 'winpmem.exe');
    const command = `${winpmemPath} ${fileName}.${fileType}`;
    const process = exec(command);

    process.stderr.on('data', (data) => {
        outputElement.innerHTML += `<span style="color: red;">${data}</span><br>`;
        outputElement.scrollTop = outputElement.scrollHeight;
    });

    process.on('exit', () => {
        console.log('Memory image successfully created.');
        outputElement.innerHTML += 'Memory image successfully created.<br>';


        const moveCommand = `move ${fileName}.${fileType} ${outputPath}`;
        const moveProcess = exec(moveCommand);

        moveProcess.stderr.on('data', (moveData) => {
            outputElement.innerHTML += `<span style="color: red;">${moveData}</span><br>`;
            outputElement.scrollTop = outputElement.scrollHeight;
        });

        moveProcess.on('exit', () => {
            console.log('File moved successfully.');
            outputElement.innerHTML += 'File moved successfully.<br>';
            loader.style.display = 'none';
        });
    });

    closeModal();
}
