# Volascan

## Introduction

This application was written in javascript and was packaged using compiler electron framework. It allows user to image memory content, perform analysis and generate visual reports. 
This README file provides an overview of the application and instructions on how to use it.



## Testing

- App was tested on the following systems
   - Windows 11 64-bit operating system
   - Windows 10 64-bit operating system

- With Python 
   - version 3.12.4



## Requirements

- Python
- Windows 10 or above
- Administrator Privilege
- 800MB available space



## Instructions

1. Download the Zip File
   - Obtain the zip file from the provided source.

2. Extract the Zip File
   - Use your preferred method to extract the contents of the zip file to a desired location on your system.
   - Recommendation: Extract the zip file on the host system.

3. Download Python
   - Ensure you have Python installed on your system.
   - You can download it from the official Python website: [Python Downloads](https://www.python.org/downloads/).

4. Run Volascan as Administrator
   - Navigate to the extracted folder and run _volascan.exe_ as **administrator**.



## Functions

1. Create memory dump
   - This function enable user to image a memory content in raw, dmp or vmem format.
   - Note: The size of the image will be larger than the capacity of memory due to the inclusion of metadata.

2. Analysis memory dump
   - This function enables the user to analyze a memory image using 17 provided module functions.
   - The output of the analysis will be saved as a text file in the same directory as the image.

3. Generate report
   - This function enables the user to visualize data using pie charts, bar charts, or sub-tree maps.
   - Visualized data will automatically be included in the report once the user generates it.



## Limitations/Known Issues

1. Volascan Error
   - If you encounter this error:

     > This app can't run on your PC
     
   - Download the raw file of _volascan.exe_ from github and replace the one in the file

2. Volascan Imaging Errors
   - Due to the nature of the kernel-level driver, the imaging function requires administrator privileges to read and write all content inside the memory.
   - Imaging cannot be done without administrator privileges.

3. Volascan Analysis Errors
   - If you encounter errors such as:
      > Error executing pslist: Progress:
      
      > Unsatisfied requirement plugins.Info.kernel.symbol_table_name:
   - Restart your device. Some drivers require a reboot after installation to load properly.
   - If the error persists:
      - Open Command Prompt and navigate to the directory of the downloaded file.
      - Type the following command:
     <p></p>
     
     ```
     cd resources/app/src/Volatility
     ```
     ```
     python vol.py -f "yourimagePath" windows.pslist.PsList
     ```
      - Error will occured but this will initialize the presence of volatility in your system.
      - Restart your device.

4. Volascan Reporting Errors
   - Users must visualize an analysis output to generate a report since data will not be parsed without visualization.

5. Processing Time
   - Some processes may complete in less than a minute, while others can take up to 20 minutes (on Gen 4 NVMe drives).
   - Note that the application’s performance is hardware-dependent. If you're using a hard disk drive, expect significantly longer processing times.
   - The application can also be run through a Flash Drive without extracting the file on the host device, but the process will take more than 1 hours to finish a 1-minute task on NVMe.
