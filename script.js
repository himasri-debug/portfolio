// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const updateActiveNav = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--primary)';
      a.style.background = 'rgba(99,102,241,0.08)';
    }
  });
};
window.addEventListener('scroll', updateActiveNav);

// =============================================
// SCROLL REVEAL ANIMATION
// =============================================
const addRevealClass = () => {
  const elements = document.querySelectorAll(
    '.stat-card, .edu-item, .exp-card, .project-card, .skill-category, .cert-card, .achievement-card, .contact-item'
  );
  elements.forEach(el => el.classList.add('reveal'));
};
addRevealClass();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// =============================================
// SMOOTH SCROLL FOR NAV LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// COUNTER ANIMATION FOR STATS
// =============================================
const animateCounter = (el, target, suffix = '') => {
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Number.isInteger(target) ? Math.floor(current) + suffix : current.toFixed(1) + suffix;
  }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent;
        const value = parseFloat(text);
        const suffix = text.includes('+') ? '+' : '';
        num.textContent = '0';
        animateCounter(num, value, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);
