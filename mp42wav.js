const fs = require('fs')
const path = require('path')
const Max = require('max-api')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FfmpegCommand = require('fluent-ffmpeg');
FfmpegCommand.setFfmpegPath(ffmpegPath);


 Max.addHandler("convertmovies", arg2 => {
  
    
    Max.outlet(convertMovies(arg2));

	
});



  function convertMovies(fpath) {
  
    fs.readdir(fpath, function (err, files) {
      if (err) {
          throw new Error(err);
      }
      if (!fs.existsSync(fpath + "/wav")){
        fs.mkdirSync(fpath + "/wav");
    }
    
      files.forEach(function (name) {
          var filePath = path.join(fpath, name);
         // var stat = fs.statSync(filePath);
          if(ismovie(filePath)) {
            runffmpeg(name, filePath, fpath) 
            // addmovie(fpath + f.filename); // replace with logic for ffmpeg
          }
          
      });
      
    })

    Max.post("all done now")
    return "done"

    
  }
  
  function ismovie(t) {
    ext = path.extname(t)
    var filetypes = [".mp4", ".mov", ".avi"]; // can't figure out how to use the same list as jit.gl.polymovie js uses so there may be discrepancies...
    for(f in filetypes) {
      if(filetypes[f]===ext)
        return true;
    }
    return false;
  }

  function runffmpeg(fileName, fullPath, outDirectory) {
    console.log(fileName)
    console.log(fullPath)
    output = outDirectory + "wav/" + path.parse(fileName).name + ".wav"
    console.log(output)
    var command = new FfmpegCommand();
    command.input(fullPath).audioFrequency(48000).save(output)
    command.on('error', function(err) {
      Max.post('Cannot process video: ' + err.message);
    })
    command.on('end', function(output) {
      Max.post('Transcoding of ' + fileName + ' succeeded !');
    });
  }

  
  