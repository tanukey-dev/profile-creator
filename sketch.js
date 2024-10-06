let bgImg;
let pfImg;
let maskImg;
let params;
let qrInputTmp;
let qrImg;
let tagDiv;

function preload() {
  const url = new URL(window.location.href);
  params = url.searchParams;

  const theme = params.get('theme');
  if (theme === 'otoskey') {
    bgImg = loadImage("base_os.png");
  } else if (theme === 'novelskey') {
    bgImg = loadImage("base_ns.png");
  } else if (theme === 'custom') {
    const bgImgUrl = params.get('bgImgUrl');
    bgImg = loadImage(bgImgUrl);
  } else {
    bgImg = loadImage("base_ns.png");
  }

  maskImg = loadImage("mask.png");

  const imgUrl = params.get('imgUrl');
  if (imgUrl) {
    pfImg = loadImage(imgUrl);
  } else {
    pfImg = loadImage("mojiskey.png");
  }
}

function setup() {
  canvas = createCanvas(1254, 758);
  canvas.position(0, 500);

  const prLabel = createDiv('プロフィール画像：');
  prLabel.position(0, 50);
  input = createFileInput(handleFile);
  input.position(200, 50);

  const nameLabel = createDiv('ユーザー名：');
  nameLabel.position(0, 90);
  const name = params.get('name');
  nameInput = createInput(name ?? "もじすきー");
  nameInput.position(200, 90);

  const idLabel = createDiv('ID (id@domain)：');
  idLabel.position(0, 130);
  const id = params.get('id');
  idInput = createInput(id ?? "mojiskey@novelskey.tarbin.net");
  idInput.position(200, 130);

  const dateLabel = createDiv('アカウント作成日：');
  dateLabel.position(0, 170);
  const date = params.get('id');
  dateInput = createInput(date ?? "2023/3/2");
  dateInput.position(200, 170);

  const qrLabel = createDiv('2次元バーコードのURL：');
  qrLabel.position(0, 210);
  const qrUrl = params.get('qrUrl');
  qrInput = createInput(qrUrl ?? "https://novelskey.tarbin.net/");
  qrInput.position(200, 210);

  const bgLabel = createDiv('背景画像(1254x758px)：');
  bgLabel.position(0, 250);

  button = createButton('ノベルスキー');
  button.mousePressed(bgNovelskey);
  button.position(0, 290);

  button = createButton('おとすきー');
  button.mousePressed(bgOtoskey);
  button.position(100, 290);

  bgInput = createFileInput(handleBgFile);
  bgInput.position(0, 330);

  button = createButton('保存');
  button.mousePressed(saveImage);
  button.position(0, 400);
}

const baseW1 = 150;
const baseW2 = 520;
const baseH1 = 120;
const baseH2 = 140;

function draw() {
  smooth();
  background(255);
	image(bgImg, 0, 0, bgImg.width, bgImg.height)
  if (pfImg) {
    pfImg.mask(maskImg);
    image(pfImg, baseW1, baseH1, 350, 350)
  }

  fill('black');
  textSize(20);
  text("NAME / ID", baseW2 + 60, baseH2 + 50)
  textSize(55);
  text(nameInput.value(), baseW2 + 55, baseH2 + 120)
  textSize(30);
  fill('gray');
  text(idInput.value(), baseW2 + 60, baseH2 + 170)
  fill('black');
  textSize(20);
  text("JOINED DATE", baseW2 + 60, baseH2 + 250)
  textSize(30);
  text(dateInput.value(), baseW2 + 60, baseH2 + 290)

  if (qrInputTmp !== qrInput.value()) {
    qrInputTmp = qrInput.value();
    let qr = qrcode(0, 'L');
    qr.addData(qrInput.value());
    qr.make();
    qrImg = loadImage(qr.createDataURL())
  }
  noSmooth();
  image(qrImg, 930, 480, 180, 180)
}

function handleBgFile(file) {
  if (file.type === 'image') {
    bgImg = loadImage(file.data);
  }
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

function bgNovelskey(){
  bgImg = loadImage("base_ns.png");
}

function bgOtoskey(){
  bgImg = loadImage("base_os.png");
}