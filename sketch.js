let seme = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);

  let numeroGlifi = 112;
  let numeroColonne = sqrt(numeroGlifi);
  let numeroRighe = sqrt(numeroGlifi);

  let xCorrente = 0;
  let yCorrente = 0;
  let dimColonna = (windowWidth / numeroColonne)-20;
  let dimRiga = (windowHeight / numeroRighe)+40;
  //creazione griglia per i glifi
  for (let g = 0; g < numeroGlifi; g++) { 
    mioGlifo(xCorrente + dimColonna / 2, yCorrente + dimRiga / 2, 40);
    xCorrente = xCorrente + dimColonna;

    if (xCorrente >= windowWidth - 1) {
      xCorrente = 0;
      yCorrente = yCorrente + dimRiga;
    }
  }
} 
function mioGlifo(_x, _y, _size) {
  push();
  translate(_x, _y);
  
  //definisco il numero di punti partendo da da un valore random e da la posizione del mouse e arrotondando con la funzione floor
  randomSeed(floor(_x * 7 + _y * 13) + seme); 
  let punti = floor(random(6, 10) + map(mouseX, 0, windowWidth, -2, 4));
  let amp = random(0.1, 0.35) + map(mouseY, 0, windowHeight, -0.5, 0.5);
//definisco le specifiche di colore e bordo grazie alla posizione del mouse e di parametri random
  fill(map(mouseX, 0, windowWidth, 100, 200),map(mouseX, 0, windowWidth, 100, 150),random (0,120)+map(mouseY, 0, windowWidth, 1, 200));
  strokeWeight(random(1,4));
  stroke(random (0,120)+map(mouseX, 0, windowWidth, 1, 100),map(mouseY, 0, windowWidth, 50, 125),map(mouseX, 0, windowWidth, 1, 100));

  // definisco il raggio dei punti grazie al valore amp ricavato prima 
  let raggi = [];
  for (let i = 0; i < punti; i++) {
    raggi[i] = _size * (1 + random(-amp, amp));
  }

  // genero la forma
  beginShape();
  let passi = 150;
  for (let k = 0; k < passi; k++) {
    let t = (k / passi) * punti;
    let i = floor(t);
    let f = t - i;
    f = (1 - cos(f * PI)) / 2; 
    let r = lerp(raggi[i % punti], raggi[(i + 1) % punti], f);
    let a = (TWO_PI / passi) * k;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);

  pop();
}
//reset del randomseed in modo da avere nuove forme
function mousePressed() {
  seme = floor(random(100000));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}