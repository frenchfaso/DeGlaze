#! /usr/bin/env python

from pathlib import Path
import shutil

# List of file paths you want to copy
file_paths = [
    Path('manifest.json'), 
    Path('index.html'), 
    Path('service-worker.js'),
    Path('icon.svg'),
    Path('milligram.min.css')
]

# Destination folder path
destination_folder = Path('../docs/')

# Ensure the destination folder exists
destination_folder.mkdir(parents=True, exist_ok=True)

# Copy each file in the list to the destination folder
for file_path in file_paths:
    if file_path.exists():
        # Define the destination file path
        destination_file = destination_folder / file_path.name
        
        # Copy the file
        shutil.copy(file_path, destination_file)
        print(f'Copied {file_path} to {destination_file}')
    else:
        print(f'File does not exist: {file_path}')
