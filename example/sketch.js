function setup() {
  createCanvas(600, 400);
  background("skyblue")
  toast("Hello from p5.toast!");
  
}

function draw() {
}


function mousePressed() {
  toast("Clicked " + round(mouseX) + ", " + round(mouseY));
  fill("orange");
  circle(mouseX, mouseY, 50);
}

function keyPressed(){
  //optionally you can set a duration in milliseconds
  toast("key: " + key, {duration: 500})
}
