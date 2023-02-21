# MUBU video segments proof of concept

segment_video_mubu_simple2vids.maxpat

- runs two video files and two video files
- I believe this plays the video from disk (or from memory if you specifically load the videos into RAM)

segment_videos_polymovie.maxpat

- uses jit.gl.polymovie to auto-load all videos from a folder
- using node js and ffmpeg, also converts all the video files into wav
- the wavs are then loaded into a mubu corpus
- NB it only works the second time you run it on a specific folder; I think this is because I need to reprogram the js to be asynchronous (but it works on second run because the WAV files already exist...)
 