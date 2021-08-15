// //

// //selectors;

// const playBtn = document.getElementById("play");
// //
// //to load images with preload js
// var queue = new createjs.LoadQueue();
// //
// // 😅
// function init() {
//   // loadSound();
//   queue.on("progress", handleFileProgress);
//   queue.on("fileload", handleFileLoad);
//   queue.on("complete", handleComplete);
//   queue.loadManifest([
//     { id: "img1", src: "assets/images/js_logo.png" },
//     { id: "img2", src: "assets/images/python_log.jpg" },
//     {
//       id: "img3",
//       src: "assets/images/reactjs logo.jpg",
//     },
//   ]);
// }

// //
// playBtn.addEventListener("click", () => {
//   playSound();
// });
// // function loadSound() {
// //   createjs.Sound.registerSound("assets/sounds/lakad_matatag.mp3", "hit");
// // }
// // function playSound() {
// //   createjs.Sound.play("hit");
// // }
// function handleFileProgress() {
//   console.log(queue.progress * 100 + "%");
// }
// function handleFileLoad(event) {
//   let image = queue.getResult(event.item.id);
//   document.body.appendChild(image);
//   image.classList.add("pic");
//   console.log(image);
// }
// function handleComplete() {
//   console.log("completed");
// }
// function setup() {
//   createCanvas(600, 600);
//   r = random(0, 255);
//   g = random(0, 255);
//   b = random(0, 255);
// }

// function draw() {
//   col = map(mouseX, 0, 600, 0, 255);
//   background(col);

//   //   if (mouseIsPressed) {
//   //     fill(0);
//   //   } else {
//   //     fill(255);
//   //   }
//   //   ellipse(mouseX, mouseY, 80, 80);
//   //console.log(mouseX, mouseY);
//   strokeWeight(5);
//   fill(r, g, 100);
//   square(100, 100, 100);
// }
