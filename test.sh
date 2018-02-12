#!/bin/sh
set -e
node smartcrop-cli.js --faceDetection --width 64 --height 64 cat.jpg cropped-cat.jpg\
  | jq -e '.topCrop.x == 170 and .topCrop.y == 0 and .topCrop.width == 341 and .topCrop.height == 341'
identify cropped-cat.jpg | grep -c 64x64
node smartcrop-cli.js --faceDetection --width 128 --height 64 cat.jpg cropped-cat.jpg\
  | jq -e '.topCrop.x == 0 and .topCrop.y == 32 and .topCrop.width == 512 and .topCrop.height == 256'
identify cropped-cat.jpg | grep -c 128x64
rm cropped-cat.jpg
