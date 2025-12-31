const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let retroNoise = true;

// Crear partículas
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.life = 60;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.life--;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 3, 3);
    }
}

// Crear fuegos artificiales
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const colors = ["#ff4444", "#44ff44", "#4488ff", "#ffff66", "#ff66ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 40; i++) {
        fireworks.push(new Particle(x, y, color));
    }
}

// Efecto retro
function drawRetro() {
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = `rgba(${150 + Math.random()*100}, ${150 + Math.random()*100}, ${150 + Math.random()*100}, 0.3)`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
}

// Animación principal
function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.08) createFirework();

    fireworks.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) fireworks.splice(i, 1);
    });

    if (retroNoise) drawRetro();

    requestAnimationFrame(animate);
}

animate();

// Mostrar mensaje final después de 10 segundos
setTimeout(() => {
    document.getElementById("mensaje").style.display = "block";
}, 10000);

// Texto caótico
setInterval(() => {
    document.title = "FELIZ AÑO ZORRAS 🎆";
}, 500);
