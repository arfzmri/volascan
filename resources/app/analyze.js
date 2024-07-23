function handleFileSelection() {
    const outputPathElement = document.getElementById('outputPath');
    const selectedFiles = outputPathElement.files;
    const outputElement = document.getElementById('outputAnalyze');
    const selectedModules = document.querySelectorAll('input[name="fileType"]:checked');
    const loader = document.querySelector('.loader');
    const errorMessageElement = document.getElementById('errorMessage');

    let errorMessage = '';

    if (selectedFiles.length === 0 && selectedModules.length === 0) {
        errorMessage = 'No file and module function selected. Please select a file and at least one module function.';
    } else if (selectedFiles.length === 0) {
        errorMessage = 'No file selected. Please select a file to analyze.';
    } else if (selectedModules.length === 0) {
        errorMessage = 'No module function selected. Please select at least one module function.';
    }

    if (errorMessage) {
        errorMessageElement.innerText = errorMessage;
        openErrorModal();
        return;
    }

    closeModal();

    loader.style.display = 'block';

    if (selectedFiles.length > 0) {
        outputElement.innerHTML = '';

        const inputFilePath = selectedFiles[0].path;
        const path = require('path');
        const inputDirectory = path.dirname(inputFilePath);
        const inputFileName = path.basename(inputFilePath, path.extname(inputFilePath));
        const currentDirectory = __dirname;
        const volatilityPath = path.join(currentDirectory, 'src', 'Volatility', 'vol.py');

        let executedCommands = 0;
        const totalCommands = selectedModules.length;

        selectedModules.forEach(module => {
            const moduleName = module.value;
            let command = '';
            let outputFileName = '';
            let outputFilePath = '';

            switch (moduleName) {
                case 'info':
                    outputFileName = `${inputFileName}_Info.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing info command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.info.Info > "${outputFilePath}"`;
                    break;
                case 'printkey':
                    outputFileName = `${inputFileName}_PrintKey.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing printkey command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.registry.printkey.PrintKey > "${outputFilePath}"`;
                    break;
                case 'psscan':
                    outputFileName = `${inputFileName}_PsScan.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing psscan command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.psscan.PsScan > "${outputFilePath}"`;
                    break;
                case 'pslist':
                    outputFileName = `${inputFileName}_PsList.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing pslist command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.pslist.PsList > "${outputFilePath}"`;
                    break;
                case 'pstree':
                    outputFileName = `${inputFileName}_PsTree.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing pstree command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.pstree.PsTree > "${outputFilePath}"`;
                    break;
                case 'hivelist':
                    outputFileName = `${inputFileName}_HiveList.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing hivelist command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.registry.hivelist.HiveList > "${outputFilePath}"`;
                    break;
                case 'hivescan':
                    outputFileName = `${inputFileName}_HiveScan.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing hivescan command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.registry.hivescan.HiveScan > "${outputFilePath}"`;
                    break;
                case 'vadinfo':
                    outputFileName = `${inputFileName}_VadInfo.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing vadinfo command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.vadinfo.VadInfo > "${outputFilePath}"`;
                    break;
                case 'vadwalk':
                    outputFileName = `${inputFileName}_VadWalk.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing vadwalk command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.vadwalk.VadWalk > "${outputFilePath}"`;
                    break;
                case 'cmdline':
                    outputFileName = `${inputFileName}_CmdLine.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing cmdline command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.cmdline.CmdLine > "${outputFilePath}"`;
                    break;
                case 'malfind':
                    outputFileName = `${inputFileName}_Malfind.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing malfind command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.malfind.Malfind > "${outputFilePath}"`;
                    break;
                case 'dlllist':
                    outputFileName = `${inputFileName}_DllList.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing dlllist command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.dlllist.DllList > "${outputFilePath}"`;
                    break;
                case 'dmodule':
                    outputFileName = `${inputFileName}_DriverModule.txt`;
                    outputFilePath = path.join(inputDirectory, outputFileName);
                    outputElement.innerHTML += 'Executing drivermodule command...<br>';
                    command = `"${volatilityPath}" -f "${inputFilePath}" windows.driver.Module > "${outputFilePath}"`;
                    break;
                // Add other cases here
            }

            if (command) {
                const exec = require('child_process').exec;
                exec(command, (error, stdout, stderr) => {
                    executedCommands++;
                    if (error) {
                        outputElement.innerHTML += `Error executing ${moduleName}: ${stderr}<br>`;
                    } else {
                        outputElement.innerHTML += `${moduleName} command executed successfully.<br>`;
                    }

                    if (executedCommands === totalCommands) {
                        loader.style.display = 'none';
                    }
                });
            }
        });
    }
}

function openErrorModal() {
    document.getElementById('errorModal').style.display = 'flex';
}

function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}
