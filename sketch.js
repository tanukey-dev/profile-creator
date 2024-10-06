let bgImg;
let pfImg;
let maskImg;
let params;

function preload() {
  const url = new URL(window.location.href);
  params = url.searchParams;

  bgImg = loadImage("base_ns.png");
  maskImg = loadImage("mask.png");

  const imgUrl = params.get('imgUrl');
  if (imgUrl) {
    pfImg = loadImage(imgUrl);
  } else {
    pfImg = loadImage("mojiskey.png");
  }
}

function setup() {
  canvas = createCanvas(1075, 650);
  canvas.position(0,300);

  input = createFileInput(handleFile);
  input.position(0,50);

  const name = params.get('name');
  nameInput = createInput(name ?? "もじすきー");
  nameInput.position(0, 100);

  const id = params.get('id');
  idInput = createInput(id ?? "mojiskey@novelskey.tarbin.net");
  idInput.position(0, 150);

  const date = params.get('id');
  dateInput = createInput(date ?? "2023/3/2");
  dateInput.position(0, 200);

  button = createButton('保存');
  button.mousePressed(saveImage);
  button.position(0, 250);
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
  text("NAME / ID", 460, 150)
  textSize(50);
  text(nameInput.value(), 455, 220)
  textSize(25);
  fill('gray');
  text(idInput.value(), 460, 270)
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

function saveImage(){
  save("profile.png");
}