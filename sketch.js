let bgImg;
let pfImg;
let maskImg;

function preload() {
  bgImg = loadImage("base_ns.png");
  pfImg = loadImage("mojiskey.png");
  maskImg = loadImage("mask.png");
}

function setup() {
  canvas = createCanvas(1075, 650);
  canvas.position(0,250);

  input = createFileInput(handleFile);
  input.position(0,50);

  nameInput = createInput("もじすきー");
  nameInput.position(0, 100);

  handleInput = createInput("mojiskey@novelskey.tarbin.net");
  handleInput.position(0, 150);

  dateInput = createInput("2023/3/2");
  dateInput.position(0, 200);
}

function draw() {
  background(255);
	image(bgImg, 0, 0, bgImg.width, bgImg.height)
  if (pfImg) {
    pfImg.mask(maskImg);
    image(pfImg, 130, 100, 300, 300)
  }

  fill('black');
  textSize(15);
  text("NAME / HANDLE", 460, 150)
  textSize(50);
  text(nameInput.value(), 455, 220)
  textSize(25);
  fill('gray');
  text(handleInput.value(), 460, 270)
  fill('black');
  textSize(15);
  text("JOINED DATE", 460, 350)
  textSize(25);
  text(dateInput.value(), 460, 390)
}

function handleFile(file) {
  if (file.type === 'image') {
    pfImg = loadImage(file.data);
    pfImg.mask(maskImg);
  } else {
    pfImg = null;
  }
}