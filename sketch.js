const density = "       .:-i|=+%O#@Ñ@#W$9876543210?!abc;:+=-,._  ;"
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';
// const density = 'Ñ@#W$9876543210?!abc;:+=-,._                  ';
// const density = '        .:♥♥♥♥♥';

let video;  
let asciiDiv;
let song;
let h1;
let canvas;
let clicksound;

const w = window.innerWidth;
const h = window.innerHeight;  

function setup() {
  canvas = createCanvas(w, h);
  video = createVideo(
    ['./video/clareando.mp4']
  );
  video.size(windowWidth/20,windowHeight/20);
    video.volume(0);
    video.hide();
  asciiDiv = createDiv();
  asciiDiv.position(400,70);
  song = loadSound('./mp3/milonga.mp3');
  clicksound = loadSound('./mp3/clicksound.wav');

  
}

function keyPressed(){
  if (key == 'a'){
    document.getElementById('about').style.display = 'block'; 
    video.pause();
  }  
  else if (key == 'x'){
    document.getElementById('about').style.display = 'none'; 
    video.play();
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    video.pause();
    clicksound.play()
    background(255, 255, 255);
    document.getElementById('playButton').style.display = 'block'; 
    document.getElementById('codingBy').style.display = 'none'; 
    document.getElementById('invasion').style.display = 'none'; 
    document.getElementById('hugoSantiago').style.display = 'none'; 
  } else {
    song.play();
    video.loop();
    video.play();
    clicksound.play()
    background(0, 0, 0);
    document.getElementById('playButton').style.display = 'none'; 
    document.getElementById('codingBy').style.display = 'block'; 
    document.getElementById('invasion').style.display = 'block'; 
    document.getElementById('hugoSantiago').style.display = 'block'; 
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(windowWidth < 1280 && windowHeight< 800 ) {
    video.size(windowWidth/25,windowHeight/25);
} else if(windowWidth < 900 && windowHeight< 400 ) {
  asciiDiv.position(20,0);
  video.size(windowWidth/50,windowHeight/50);
} else {
  video.size(windowWidth/20,windowHeight/20);
}
}

window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
}


function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}



