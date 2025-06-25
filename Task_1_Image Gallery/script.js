const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let currentImages = Array.from(galleryItems);

// Open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    showLightbox(item.querySelector('img').src);
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Navigate to previous image
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showLightbox(currentImages[currentIndex].querySelector('img').src);
});

// Navigate to next image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showLightbox(currentImages[currentIndex].querySelector('img').src);
});

// Filter images by category
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    filterImages(category);
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

function showLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
}

function filterImages(category) {
  currentImages = Array.from(galleryItems).filter(item => {
    const itemCategory = item.getAttribute('data-category');
    item.classList.toggle('hidden', category !== 'all' && itemCategory !== category);
    return category === 'all' || itemCategory === category;
  });
  currentIndex = 0;
}

//Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});