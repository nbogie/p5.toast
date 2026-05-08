function setup() {
  createCanvas(600, 400);
  background("skyblue")
}

function draw() {
}


function mousePressed() {
  toast("Hi! " + round(millis()));
  fill('#303030')
  circle(mouseX, mouseY, 50);
}

function keyPressed(){
  //optionally you can set a duration in milliseconds
  toast("key: " + key, {duration: 500})
}
