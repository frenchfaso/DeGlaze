#!/bin/bash

# Check if an argument was provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <source-image.png>"
  exit 1
fi

# Source image file
SOURCE_IMAGE=$1

# Directory where the icons will be saved
ICON_DIR="../icons"
mkdir -p $ICON_DIR

# Array of desired icon sizes
declare -a SIZES=("48x48" "72x72" "96x96" "128x128" "144x144" "152x152" "192x192" "384x384" "512x512")

# Generate icons
for SIZE in "${SIZES[@]}"; do
  echo "Generating icon size $SIZE..."
  convert "$SOURCE_IMAGE" -resize "$SIZE" "$ICON_DIR/icon-$SIZE.png"
done

echo "All icons have been generated."
