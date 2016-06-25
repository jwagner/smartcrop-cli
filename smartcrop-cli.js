#!/usr/bin/env node
/** smartcrop-cli.js
 *
 * Command line interface for smartcrop.js
 *
 * Copyright (C) 2014 Jonas Wagner
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var argv = require('yargs')
    .usage('Usage: $0 [OPTION] FILE [OUTPUT]')
    .example('$0 --width 100 --height 100 photo.jpg square-thumbnail.jpg', 'generate a 100x100 thumbnail from photo.jpg')
    .config('config')
    .defaults('quality', 90)
    .defaults('outputFormat', 'jpg')
    .boolean('faceDetection')
    .describe({
        config: 'path to a config.json',
        width: 'width of the crop',
        height: 'height of the crop',
        faceDetection: 'perform faceDetection using opencv',
        outputFormat: 'image magick output format string',
        quality: 'jpeg quality of the output image',
        '*': 'forwarded as options to smartcrop.js'
    })
    //.demand(['input', 'width','height'])
    .demand(1)
    .argv,
    input = argv._[0],
    output = argv._[1];

var concat = require('concat-stream');
var fs = require('fs'),
    gm = require('gm').subClass({ imageMagick: true }),
    smartcrop = require('smartcrop-gm'),
    _ = require('underscore');

var cv;

if (argv.faceDetection) {
  try {
    cv = require('opencv');
  }
  catch(e) {
    console.error(e);
    console.error('skipping faceDetection');
    argv.faceDetection = false;
  }
}

var options = _.extend(
        {},
        argv.config,
        _.omit(argv, 'config', 'quality', 'faceDetection')
    );

function resize(result){
  var crop = result.topCrop;
  var cmd = gm(input)
      .crop(crop.width, crop.height, crop.x, crop.y)
      .resize(options.width, options.height)
      .unsharp('2x0.5+1+0.008')
      .colorspace('sRGB')
      .autoOrient()
      .strip();

  if(argv.quality) {
      cmd = cmd.quality(argv.quality);
  }

  if(output === '-'){
    cmd.stream(argv.outputFormat).pipe(process.stdout);
  }
  else {
    cmd.write(output, function(err) {
        if(err) console.error(err);
    });
  }
}

function faceDetect(input, options) {
  return new Promise(function(resolve, reject) {
    if (!argv.faceDetection) return resolve(false);
    cv.readImage(input, function(err, image) {
      if (err) return reject(err);
      image.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
          if (err) return reject(err);
          options.boost = faces.map(function(face){
            return {
              x: face.x,
              y: face.y,
              width: face.width,
              height: face.height,
              weight: 1.0
            };
          });
          console.log('faces', faces);
          resolve(true);
      });
    });
  });
}

function analyse(){
  faceDetect(input, options)
    .then(function(){
        return smartcrop.crop(input, options);
    })
    .then(function(result) {
      if(output !== '-') {
        console.log(JSON.stringify(result, null, '  '));
      }
      if(output && options.width && options.height){
        resize(result);
      }
    }, function(err) {
      console.error(err.stack);
    });
}

if(input === '-'){
    process.stdin.pipe(concat(function(inputBuffer) {
      input = inputBuffer;
      analyse();
    }));
}
else {
  analyse();
}
