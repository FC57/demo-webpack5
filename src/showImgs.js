const imgsSrc = [require('./assets/images/note.jpg'), require('./assets/images/preview.jpg')];

imgsSrc.forEach(src => {
  console.log(src);
  const img = document.createElement('img');
  img.src = src;
  img.style.height = '100%';
  document.body.appendChild(img);
});
