function toggleText() {
  const datText = document.querySelector('#text');
  const datButton = document.querySelector('.toggle-text-button');
  
  datButton.addEventListener('click', () => datText.hidden = !datText.hidden);
}
