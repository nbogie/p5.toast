function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("skyblue")
}

function mousePressed() {
  toast(millis());
}

function keyPressed(){
  toast("key: " + key)
}