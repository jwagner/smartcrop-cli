#!/bin/sh
set -e
node smartcrop-cli.js --faceDetection --width 64 --height 64 cat.jpg square-cat.jpg\
  | jq -e '.topCrop.x == 170 and .topCrop.y == 0 and .topCrop.width == 341 and .topCrop.height == 341'
identify square-cat.jpg
rm square-cat.jpg
