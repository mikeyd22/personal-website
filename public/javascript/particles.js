(function () {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var mouse = { x: null, y: null };
  var particles = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', function () {
    resize();
    initParticles();
  });
  resize();

  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x      = Math.random() * canvas.width;
    this.y      = Math.random() * canvas.height;
    this.vx     = (Math.random() - 0.5) * 0.35;
    this.vy     = (Math.random() - 0.5) * 0.35;
    this.radius = Math.random() * 1.8 + 0.8;
    this.alpha  = Math.random() * 0.45 + 0.15;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repulsion
    if (mouse.x !== null) {
      var dx   = this.x - mouse.x;
      var dy   = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && dist > 0) {
        var force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 1.8;
        this.y += (dy / dist) * force * 1.8;
      }
    }

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Clamp
    this.x = Math.max(0, Math.min(canvas.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 184, 166, ' + this.alpha + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    var density = Math.floor((canvas.width * canvas.height) / 10000);
    var count   = Math.min(Math.max(density, 40), 110);
    for (var i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    var maxDist = 130;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx   = particles[i].x - particles[j].x;
        var dy   = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          var alpha = (1 - dist / maxDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(20, 184, 166, ' + alpha + ')';
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawConnections();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
})();
