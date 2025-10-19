// === BALON ANIMASI ===
const canvasBalloons = document.getElementById("balloons");
const ctxB = canvasBalloons.getContext("2d");
canvasBalloons.width = window.innerWidth;
canvasBalloons.height = window.innerHeight;

const balloons = Array.from({ length: 20 }).map(() => ({
  x: Math.random() * canvasBalloons.width,
  y: Math.random() * canvasBalloons.height,
  r: 20 + Math.random() * 20,
  color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  speed: 0.5 + Math.random() * 1,
}));

function drawBalloons() {
  ctxB.clearRect(0, 0, canvasBalloons.width, canvasBalloons.height);
  balloons.forEach(b => {
    ctxB.beginPath();
    ctxB.fillStyle = b.color;
    ctxB.ellipse(b.x, b.y, b.r * 0.8, b.r, 0, 0, 2 * Math.PI);
    ctxB.fill();
    b.y -= b.speed;
    if (b.y < -50) b.y = canvasBalloons.height + 50;
  });
  requestAnimationFrame(drawBalloons);
}
drawBalloons();

// === FOTO BERGULIR ===
const photoContainer = document.getElementById("photoContainer");
const photos = [
  "sania1.jpg",
  "sania2.jpg",
  "sania3.jpg",
  "sania4.jpg",
  "sania5.jpg",
  "sania6.jpg",
  "sania7.jpg",
];

let active = false;

function startFloatingPhotos() {
  if (active) return;
  active = true;

  setInterval(() => {
    const img = document.createElement("img");
    img.src = `assets/${photos[Math.floor(Math.random() * photos.length)]}`;
    img.classList.add("photo");

    img.style.left = Math.random() * 90 + "vw";
    img.style.animationDuration = 10 + Math.random() * 10 + "s";
    img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    photoContainer.appendChild(img);

    setTimeout(() => img.remove(), 20000);
  }, 1500);
}

// === KEMBANG API ===
const fireworksCanvas = document.getElementById("fireworks");
const ctxF = fireworksCanvas.getContext("2d");
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

function firework() {
  const x = Math.random() * fireworksCanvas.width;
  const y = Math.random() * fireworksCanvas.height / 2;
  const colors = ["#ff4040", "#ffd700", "#00bfff", "#ff69b4", "#32cd32"];
  let particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x, y,
      radius: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      life: 100 + Math.random() * 50
    });
  }

  function animate() {
    ctxF.fillStyle = "rgba(0,0,0,0.2)";
    ctxF.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    particles.forEach(p => {
      ctxF.beginPath();
      ctxF.fillStyle = p.color;
      ctxF.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctxF.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 2;
    });

    particles = particles.filter(p => p.life > 0);
    if (particles.length) requestAnimationFrame(animate);
  }
  animate();
}

// === EVENT SAAT TOMBOL DIKLIK ===
const playBtn = document.getElementById("playBtn");
const bgMusic = document.getElementById("bgMusic");

playBtn.addEventListener("click", () => {
  bgMusic.play();
  setInterval(firework, 800);
  startFloatingPhotos();
  playBtn.disabled = true;
  playBtn.innerText = "Selamat Menikmati 🎉";
});