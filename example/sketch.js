function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("skyblue")
}

function mousePressed() {
  toast("hi at " + round(millis()));
}

function keyPressed(){
  //optionally you can set a duration in milliseconds
  toast("key: " + key, {duration: 500})
}