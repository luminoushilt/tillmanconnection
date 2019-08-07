document.addEventListener('DOMContentLoaded', () => {

  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', scrollFunction);

  function scrollFunction() {
    if(window.pageYOffset > 300) { // Show backToTopButton
     backToTopButton.style.display = 'block';
    }
    else { // Hide backToTopButton
     backToTopButton.style.display = 'none';
    }
  }

  backToTopButton.addEventListener('click', backToTop);

  function backToTop(event) { // Scroll Back to the top of the document
   window.scrollTo(0, 0);
   event.preventDefault();
  }

 });