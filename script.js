// Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

let darkToggle;

const setTheme = (theme) => {
  body.classList.toggle('light', theme === 'light');
  localStorage.setItem('theme', theme);
  
  darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    // Update toggle button
    if (theme === 'dark') {
      darkToggle.textContent = 'ON';
      darkToggle.className = 'toggle-btn toggle-on';
    } else {
      darkToggle.textContent = 'OFF';
      darkToggle.className = 'toggle-btn toggle-off';
    }
  }
};

themeToggle.addEventListener('click', () => {
  const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.querySelector('.progress').style.width = scrollPercent + '%';

  // Update active dot
  sections.forEach((sectionId, index) => {
    const section = document.getElementById(sectionId);
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
    }
  });
});

// Scroll Animations with Stagger
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 100);
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'var(--glass-bg)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'var(--glass-bg)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const cursor = document.getElementById('cursor');
const texts = ['Rashminda Aluvihare', 'Fullstack Developer', 'Creative Coder'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

if (typingText && cursor) {
  typeWriter();
}

// EmailJS integration - Replace YOUR_XXX with dashboard values
// 1. https://www.emailjs.com → Dashboard → Public Key  
// 2. Email Services → SERVICE_ID
// 3. Email Templates → TEMPLATE_ID

const YOUR_PUBLIC_KEY = 'pDSCaLhtyhKKqRh0o'; // Account Public Key
const YOUR_SERVICE_ID = 'service_qyz5l33';  // Gmail service
const YOUR_TEMPLATE_ID = 'template_4h669eo'; // Contact form template

emailjs.init(YOUR_PUBLIC_KEY);

// Modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const closeBtn = document.querySelector('.close');

const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  const templateParams = {
    user_name: formData.get('user_name'),
    user_email: formData.get('user_email'),
    message: formData.get('message')
  };

  // Validate
  if (!templateParams.user_name || !templateParams.user_email || !templateParams.message) {
    showModal('Error', 'Please fill in all fields.');
    return;
  }

  try {
    // Send email
    await emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY);
    const userName = templateParams.user_name;
    const messagePreview = templateParams.message.length > 50 ? templateParams.message.substring(0, 50) + '...' : templateParams.message;
    showModal(`Success, ${userName}!`, `Your message "${messagePreview}" sent to rashmindaluvihare@gmail.com. Reply soon!`);
    form.reset();
  } catch (error) {
    console.error('EmailJS error:', error);
    showModal('Error', 'Failed to send message. Please try again or email directly.');
  }
});

// Modal functions
function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Blockchain Animation for Hero
const blockchainCanvas = document.getElementById('blockchain-canvas');
if (blockchainCanvas) {
  const heroCtx = blockchainCanvas.getContext('2d');
  blockchainCanvas.width = window.innerWidth;
  blockchainCanvas.height = window.innerHeight;

  const nodes = [];
  const edges = [];
  const numNodes = 12;

  // Create blockchain nodes
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * blockchainCanvas.width,
      y: Math.random() * blockchainCanvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 8 + 6,
      glow: Math.random() * 0.5 + 0.5,
      hue: Math.random() * 60 + 180 // Blues/greens for blockchain theme
    });
  }

  function animateBlockchain() {
    heroCtx.fillStyle = 'rgba(12, 12, 12, 0.1)';
    heroCtx.fillRect(0, 0, blockchainCanvas.width, blockchainCanvas.height);

    // Update nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > blockchainCanvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > blockchainCanvas.height) node.vy *= -1;

      // Draw node with glow
      const gradient = heroCtx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2);
      gradient.addColorStop(0, `hsla(${node.hue}, 70%, 60%, ${node.glow})`);
      gradient.addColorStop(1, 'transparent');

      heroCtx.fillStyle = gradient;
      heroCtx.beginPath();
      heroCtx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
      heroCtx.fill();

      // Inner node
      heroCtx.fillStyle = `hsla(${node.hue}, 70%, 60%, 0.8)`;
      heroCtx.beginPath();
      heroCtx.arc(node.x, node.y, node.size / 2, 0, Math.PI * 2);
      heroCtx.fill();
    });

    // Draw connecting edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
          heroCtx.strokeStyle = `hsla(200, 70%, 50%, ${1 - dist / 150})`;
          heroCtx.lineWidth = 1;
          heroCtx.beginPath();
          heroCtx.moveTo(nodes[i].x, nodes[i].y);
          heroCtx.lineTo(nodes[j].x, nodes[j].y);
          heroCtx.stroke();
        }
      }
    }

    requestAnimationFrame(animateBlockchain);
  }

  animateBlockchain();

  window.addEventListener('resize', () => {
    blockchainCanvas.width = window.innerWidth;
    blockchainCanvas.height = window.innerHeight;
  });
}

// Scroll Particles (Simple Canvas)
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '500';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    vy: Math.random() * 2 + 1,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.2,
    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
  };
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (window.scrollY > 100 && Math.random() > 0.8) {
    particles.push(createParticle());
  }
  particles = particles.filter(p => {
    p.y -= p.vy;
    p.opacity -= 0.01;
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return p.y > 0 && p.opacity > 0;
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
