// === BALON AKTIF DARI AWAL ===
const balloonCanvas = document.getElementById("balloons");
const bctx = balloonCanvas.getContext("2d");
balloonCanvas.width = window.innerWidth;
balloonCanvas.height = window.innerHeight;

class Balloon {
  constructor() {
    this.x = Math.random() * balloonCanvas.width;
    this.y = balloonCanvas.height + Math.random() * 200;
    this.size = 20 + Math.random() * 30;
    this.speed = 0.5 + Math.random() * 1.5;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }
  draw() {
    bctx.beginPath();
    bctx.ellipse(this.x, this.y, this.size * 0.8, this.size, 0, 0, Math.PI * 2);
    bctx.fillStyle = this.color;
    bctx.fill();
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = balloonCanvas.height + this.size;
      this.x = Math.random() * balloonCanvas.width;
    }
    this.draw();
  }
}

let balloons = [];
for (let i = 0; i < 30; i++) balloons.push(new Balloon());

function animateBalloons() {
  bctx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
  balloons.forEach((b) => b.update());
  requestAnimationFrame(animateBalloons);
}
animateBalloons();

// === FIREWORKS ===
const fwCanvas = document.getElementById("fireworks");
const fctx = fwCanvas.getContext("2d");
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: x,
        y: y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 1,
        alpha: 1
      });
    }
  }
  draw() {
    this.particles.forEach((p) => {
      fctx.fillStyle = `rgba(${this.color},${p.alpha})`;
      fctx.beginPath();
      fctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      fctx.fill();
    });
  }
  update() {
    this.particles.forEach((p) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
    });
    this.draw();
  }
}

function startFireworks() {
  setInterval(() => {
    let x = Math.random() * fwCanvas.width;
    let y = Math.random() * fwCanvas.height * 0.6;
    let color = `${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}`;
    fireworks.push(new Firework(x, y, color));
  }, 700);

  function animateFireworks() {
    fctx.fillStyle = "rgba(0,0,0,0.1)";
    fctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
    fireworks.forEach((fw) => fw.update());
    fireworks = fireworks.filter((fw) => fw.particles.some((p) => p.alpha > 0));
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();
}

// === FOTO BERGULIR ===
function startPhotos() {
  const container = document.getElementById("photoContainer");
  const photoList = [
    "sania1.jpg",
    "sania2.jpg",
    "sania3.jpg",
    "sania4.jpg",
    "sania5.jpg",
    "sania6.jpg",
    "sania7.jpg"
  ];

  for (let i = 0; i < 10; i++) {
    const img = document.createElement("img");
    img.src = `assets/${photoList[Math.floor(Math.random() * photoList.length)]}`;
    img.classList.add("photo");
    img.style.left = `${Math.random() * 85 + 5}%`;
    img.style.animationDelay = `${Math.random() * 10}s`;
    img.style.animationDuration = `${16 + Math.random() * 6}s`;
    container.appendChild(img);
  }
}

// === TOMBOL ===
const playBtn = document.getElementById("playBtn");
const bgMusic = document.getElementById("bgMusic");

playBtn.addEventListener("click", () => {
  bgMusic.play();
  startFireworks();
  startPhotos();
  playBtn.disabled = true;
  playBtn.innerText = "🎵 Sedang Berjalan 🎆";
});
