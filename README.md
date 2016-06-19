# Command line interface for smartcrop.js

![Example](http://29a.ch/sandbox/2014/smartcrop/example.jpg)
Image: [https://www.flickr.com/photos/endogamia/5682480447/](https://www.flickr.com/photos/endogamia/5682480447) by N. Feans

You can learn more about smartcrop.js on the [library homepage](https://github.com/jwagner/smartcrop.js)

## Installation
You can install [smartcrop-cli](https://www.npmjs.com/package/smartcrop-cli) using [npm](https://www.npmjs.com/):
```
npm install -g smartcrop-cli
```

## Dependencies
Smartcrop-cli requires [image magick](https://www.imagemagick.org/) to operate.
On Debian based systems ```apt-get install imagemagick``` on mac os ```brew install imagemagick```.

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
