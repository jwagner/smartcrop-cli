# Command line interface for smartcrop.js

**WARNING: This is a work in progress. Neither the API nor the algorithm are finished.
(Automated) verification, testing and benchmarking are yet to be done.**

![Example](http://29a.ch/sandbox/2014/smartcrop/example.jpg)
Image: [https://www.flickr.com/photos/endogamia/5682480447/](https://www.flickr.com/photos/endogamia/5682480447) by N. Feans

You can learn more about smartcrop.js on the [library homepage](https://github.com/jwagner/smartcrop.js)

## Dependencies
Smartcrop-cli requires [node-canvas](https://github.com/Automattic/node-canvas) which requires local libraries to be installed. Please refer to the [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages) for platform specific installation instructions.

## Installation
You can install smartcrop-cli using npm
```
npm install -g smartcrop-cli
```

## Usage

```
Usage: node ./smartcrop-cli.js [OPTION] FILE [OUTPUT]

Examples:
  node ./smartcrop-cli.js --width 100 --height 100 photo.jpg square-thumbnail.jpg    generate a 100x100 thumbnail from photo.jpg


Options:
  --config   path to a config.json               
  --width    width of the crop                   
  --height   height of the crop                  
  --quality  jpeg quality of the output image      [default: 90]
  -*         forwarded as options to smartcrop.js
```
