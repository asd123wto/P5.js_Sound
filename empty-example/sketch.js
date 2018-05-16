var fft;

var fft2;

var w;
//显示的音谱数量*必须能被1024整除
var num=512;

var img;
function preload() {
    img = loadImage('1186754.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB);
    angleMode(DEGREES);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.7, num);
    fft.setInput(mic);
    fft2 = new p5.FFT(0.9, num);
    fft2.setInput(mic);
    w=width/num;
}
function draw(){
    background(img);
    var spectrum = fft.analyze();
    var spectrum2 = fft2.analyze();
    //stroke(255);
    noStroke();
    for (var i = 0; i< spectrum.length; i++){
        var amp=spectrum[i];
        var y=map(amp*3/4,0,256,height,0);
        c=color('hsba('+i+',100%,100%, 0.5)');
            fill(c);
            rect(i*w, y, w, height-y );
    }
    for (var j = 0; j< spectrum2.length; j++){
        var amp=spectrum2[j];
        var y=map(amp*3/4,0,256,height,0);
        c=color('hsba(120,0%,100%, 0.7)');
        fill(c);
        rect(j*w, y-13, w-1, 10 );
    }

    stroke(255);
    noFill();
    text('labmem', 4, 100);
}
