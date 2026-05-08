function setup() {
  createCanvas(400, 400);
  showAlive("skyblue")
}

function draw() {
}

function mousePressed() {
  toast(millis());
}

function keyPressed(){
  toast("key: " + key)
}