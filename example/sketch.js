function setup() {
  createCanvas(600, 400);
  background("skyblue")
}

function draw() {

}


function mousePressed() {
  toast("hi at " + round(millis()));
  circle(mouseX, mouseY, 40);

}

function keyPressed(){
  //optionally you can set a duration in milliseconds
  toast("key: " + key, {duration: 500})
}