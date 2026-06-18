// Hamburger Menu
function initMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      const hamburgerDisplay = window.getComputedStyle(hamburger).display;
      if (hamburgerDisplay !== 'none') {
        hamburger.classList.remove('active');
        navLinks.style.display = 'none';
      }
    });
  });
}

// Gallery Lightbox
function initGallery() {
  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;

  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  if (galleryImages.length === 0) return;

  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    const fullImageSrc = galleryImages[index].getAttribute('data-full') || galleryImages[index].src;
    lightboxImage.src = fullImageSrc;
    lightbox.style.display = 'flex';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const fullImageSrc = galleryImages[currentImageIndex].getAttribute('data-full') || galleryImages[currentImageIndex].src;
    lightboxImage.src = fullImageSrc;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const fullImageSrc = galleryImages[currentImageIndex].getAttribute('data-full') || galleryImages[currentImageIndex].src;
    lightboxImage.src = fullImageSrc;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') lightbox.style.display = 'none';
    }
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch('https://contact.furry-tails.de', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Thank you for reaching out! I\'ll get back to you soon.');
        this.reset();
      } else {
        alert('Error sending email. Please try again.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

// Initialize all features when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initGallery();
    initContactForm();
  });
} else {
  initMenu();
  initGallery();
  initContactForm();
}
