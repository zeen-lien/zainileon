import { useEffect, useRef } from 'react';

/**
 * Komponen AnimatedBackground - Background dengan particles dan shooting stars
 * Menggunakan Canvas API untuk animasi yang smooth
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let shootingStars = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class untuk bintang kecil
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleDirection = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity >= 0.8 || this.opacity <= 0.3) {
          this.twinkleDirection *= -1;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ShootingStar class untuk bintang jatuh
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5; // Top half only
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 15;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 1;
        this.fadeSpeed = 0.02;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= this.fadeSpeed;

        // Reset when off screen or faded
        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        
        gradient.addColorStop(0, `rgba(0, 212, 255, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(125, 211, 192, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      }
    }

    // Initialize particles (bintang kecil)
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Initialize shooting stars (bintang jatuh)
    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Update and draw shooting stars
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
