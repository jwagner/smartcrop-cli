# Command line interface for smartcrop.js

[![Build Status](https://travis-ci.org/jwagner/smartcrop-cli.svg?branch=master)](https://travis-ci.org/jwagner/smartcrop-cli)

![Example](http://29a.ch/sandbox/2014/smartcrop/example.jpg)
Image: [https://www.flickr.com/photos/endogamia/5682480447/](https://www.flickr.com/photos/endogamia/5682480447) by N. Feans

You can learn more about smartcrop.js on the [library homepage](https://github.com/jwagner/smartcrop.js)

If the optional dependency [node-opencv](https://github.com/peterbraden/node-opencv)
is installed smartcrop-cli can additionally detect faces and take them into account
when finding the optimal crop.

## Installation

You can install [smartcrop-cli](https://www.npmjs.com/package/smartcrop-cli) using [npm](https://www.npmjs.com/):

```
npm install -g smartcrop-cli
```

## Dependencies

Smartcrop-cli requires [image magick](https://www.imagemagick.org/) to operate.
On Debian based systems `apt-get install imagemagick` on mac os `brew install imagemagick`.

## Usage

```
Usage: smartcrop [OPTION] FILE [OUTPUT]

Examples:
  smartcrop --width 100 --height 100 photo.jpg square-thumbnail.jpg    generate a 100x100 thumbnail from photo.jpg


Options:
  --config         path to a config.json
  --width          width of the crop
  --height         height of the crop
  --faceDetection  perform faceDetection using opencv
  --outputFormat   image magick output format string     [default: "jpg"]
  --quality        jpeg quality of the output image      [default: 90]
  -*               forwarded as options to smartcrop.js
```
