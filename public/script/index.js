(function(){
  const $ = document.querySelector.bind(document);
  const titleDom = $('h1.title');
  if (titleDom) {
    titleDom.dataset.text = titleDom.textContent;
  }
})();
