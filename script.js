// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const backdrop  = document.getElementById('navBackdrop');

function openMenu() {
  navLinks.classList.add('active');
  backdrop.classList.add('active');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('active');
  backdrop.classList.remove('active');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('active') ? closeMenu() : openMenu();
});

// Close when clicking backdrop
backdrop.addEventListener('click', closeMenu);

// Close when clicking any nav link
document.querySelectorAll('.nav-link, .nav-cta-mobile a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      
      // If it's a stats counter, trigger the count animation
      if (entry.target.classList.contains('two-col')) {
        startCounters();
      }
      
      // Optional: Stop observing once animated
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});

// Counter Animation for Stats
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + (target === 500 || target === 100 ? '+' : '');
      }
    };

    updateCount();
  });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scroll for anchor links
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

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.classList.remove('open');
    });

    // Toggle current
    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});
