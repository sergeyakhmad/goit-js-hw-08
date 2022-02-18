import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE = 'feedback-form-state';
let items = {};

form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(textAreaInput, 500));
populateForm();

function textAreaInput(evt) {
  items[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(items));
}

function formSubmit(evt) {
  evt.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    alert('Все поля должны быть заполнены!');
  } else {
    console.log(items);
    evt.currentTarget.reset();

    localStorage.removeItem(LOCAL_STORAGE);
    items = {};
  }
}

function populateForm() {
  const savedObject = JSON.parse(localStorage.getItem(LOCAL_STORAGE));

  for (const key in savedObject) {
    if (key) {
      form[key].value = savedObject[key];
      items = savedObject;
    }
  }
}
