const animatedText = document.getElementById('animated-text');
const cursor = document.querySelector('.cursor');
const rectangle = document.querySelector('.rectangle');

const texts = [
    'VibeCoder',
    'AirCode Owner',
    'Cr4ck3d Owner'
];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < texts[textIndex].length) {
    animatedText.textContent += texts[textIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 100); 
  } else {
    setTimeout(deleteEffect, 2000); 
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    animatedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteEffect, 50); 
  } else {
    textIndex = (textIndex + 1) % texts.length; 
    setTimeout(typeEffect, 500);
  }
}

typeEffect();

const titleText = "@ventreeexx";
let titleIndex = 0;

function animateTitle() {
  document.title = titleText.substring(0, titleIndex) + (titleIndex < titleText.length ? "|" : "");
  titleIndex++;

  if (titleIndex <= titleText.length) {
    setTimeout(animateTitle, 150);
  } else {
    setTimeout(() => {
      titleIndex = 0;
      animateTitle();
    }, 1000);
  }
}

animateTitle();

let ticking = false;
let lastRect = null;

document.addEventListener('mousemove', (event) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const rect = rectangle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (clientX - centerX) / (rect.width / 2);
      const deltaY = (clientY - centerY) / (rect.height / 2);
      const xRotation = Math.max(-30, Math.min(30, deltaY * -30));
      const yRotation = Math.max(-30, Math.min(30, deltaX * 30));

      rectangle.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

      const moveX = (clientX - innerWidth / 2) * 0.01;
      const moveY = (clientY - innerHeight / 2) * 0.01;
      document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;

      ticking = false;
    });
    ticking = true;
  }
});