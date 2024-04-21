#! /usr/bin/env python

from pathlib import Path
import shutil
import re

# List of file paths you want to copy
file_paths = [
    Path('manifest.json'), 
    Path('index.html'),
    Path('app.js'), 
    Path('service-worker.js'),
    Path('icon.svg'),
    Path('milligram.min.css')
]

def modify_service_worker_cache(base_url, file_path):
    # Regular expression to find the URLS_TO_CACHE array definition
    pattern = re.compile(r'(const URLS_TO_CACHE = \[)(.*?)(\];)', re.DOTALL)
    
    try:
        with open(file_path, 'r+') as file:
            content = file.read()
            
            # Function to prepend base_url to each URL in the array
            def url_replacer(match):
                urls = match.group(2).split(',')
                modified_urls = [f'"{base_url}{url.strip()[1:-1]}"' for url in urls]
                return f'{match.group(1)}\n    ' + ',\n    '.join(modified_urls) + f'\n{match.group(3)}'
            
            # Replace the URLs in the URLS_TO_CACHE array
            modified_content = pattern.sub(url_replacer, content)
            
            # Write the modified content back to the file
            file.seek(0)
            file.write(modified_content)
            file.truncate()
            
        print(f"Successfully modified {file_path} with base_url: {base_url}")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

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

modify_service_worker_cache("https://frenchfaso.github.io/DeGlaze", "../docs/service-worker.js")
