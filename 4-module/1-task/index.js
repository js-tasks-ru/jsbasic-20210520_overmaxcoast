function makeFriendsList(friends) {
  const initBody = document.querySelector('body').insertAdjacentHTML('afterbegin', '<ul></ul>');
  const initUl = document.querySelector('ul');
  
  for (const item of friends) initUl.insertAdjacentHTML('beforeend', `<li>${item.firstName} ${item.lastName}</li>`);
  
  return initUl;
}
