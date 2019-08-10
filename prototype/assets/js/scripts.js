document.addEventListener('DOMContentLoaded', function() {

  const backToTopButton = document.querySelector('.back-to-top');
  const scrollLinks = document.querySelectorAll('.scroll-link');

  window.addEventListener('scroll', scrollFunction);

  function scrollFunction() {
    if(window.pageYOffset > 300) { // Show backToTopButton
     backToTopButton.style.display = 'block';
    }
    else { // Hide backToTopButton
     backToTopButton.style.display = 'none';
    }
  }

  backToTopButton.addEventListener('click', smoothScrollBackToTop);

  function smoothScrollBackToTop() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, distance*(progress/duration) + startPosition);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

  }

  for(let i=0; i<scrollLinks.length; i++) {
    scrollLinks[i].addEventListener('click', smoothScroll);
  }

  // smooth scrolling
  function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, distance*(progress/duration) + startPosition);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

  }

 });