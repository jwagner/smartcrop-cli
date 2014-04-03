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
    .describe({
        config: 'path to a config.json',
        width: 'width of the crop',
        height: 'height of the crop',
        quality: 'jpeg quality of the output image',
        '*': 'forwarded as options to smartcrop.js'
    })
    //.demand(['input', 'width','height'])
    .demand(1)
    .argv,
    input = argv._[0],
    output = argv._[1];

var fs = require('fs'),
    Canvas = require('canvas'),
    SmartCrop = require('smartcrop'),
    _ = require('underscore');

var img = new Canvas.Image(),
    options = _.extend({canvasFactory: function(w, h){ return new Canvas(w, h); }}, argv.config, _.omit(argv, 'config', 'quality'));

img.src = fs.readFileSync(input);
SmartCrop.crop(img, options, function(result){
    console.log(JSON.stringify(result, null, '  '));
    if(output && options.width && options.height){
        var canvas = new Canvas(options.width, options.height),
            ctx = canvas.getContext('2d'),
            crop = result.topCrop,
            f = fs.createWriteStream(output);
        ctx.patternQuality = 'best';
        ctx.filter = 'best';
        ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
        canvas.syncJPEGStream({quality: argv.quality}).pipe(f);
    }
});
