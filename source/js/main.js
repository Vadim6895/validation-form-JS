'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const successMessage = document.querySelector('.modal__ok');
  const closeMessageBtn = successMessage.querySelector('.modal__ok-button');
  const submitButton = form.querySelector('.form__button');
  const pass = form.querySelector('.form__input--pass');
  const confirmPass = form.querySelector('.form__input--confirm-pass');

  const day = form.querySelector('.form__input--day');
  const month = form.querySelector('.form__input--month');
  const year = form.querySelector('.form__input--year');

  let requiredFields = {
    name: false,
    surname: false,
    pass: false,
    confirmPass: false,
    day: false,
    month: false,
    year: false,
    mail: false,
    validAge: false,
  };

  const nameReg = /^[а-яё-\s]{3,40}$/i;
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passReg = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[0-9])(?=.*[^a-zа-яёA-ZА-ЯЁ0-9\s]).{8,}/;

  const isValidAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 ? true : false;
  };

  const disabledSubmitButton = value => {
    if (value) {
      submitButton.disabled = true;
      submitButton.classList.add('form__button--disabled');
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('form__button--disabled');
    }
  };

  const validationElem = elem => {
    switch (elem.name) {
      case 'surname':
        if (!nameReg.test(elem.value) && elem.value !== '') {
          elem.nextElementSibling.textContent = 'Введите корректную фамилию';
          requiredFields.surname = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.surname = true;
        }
        if (elem.value.length < 3 && elem.value !== '') {
          elem.nextElementSibling.textContent =
            'От 3 до 40 символов кириллицей';
          requiredFields.surname = false;
        }
        break;

      case 'name':
        if (!nameReg.test(elem.value) && elem.value !== '') {
          elem.nextElementSibling.textContent = 'Введите корректное имя';
          requiredFields.name = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.name = true;
        }
        if (elem.value.length < 3 && elem.value !== '') {
          elem.nextElementSibling.textContent =
            'От 3 до 40 символов кириллицей';
          requiredFields.name = false;
        }
        break;

      case 'password':
        if (pass.value === confirmPass.value && pass.value !== '' && passReg.test(elem.value)) {
          requiredFields.pass = true;
          requiredFields.confirmPass = true;
        } else {
          requiredFields.pass = false;
          requiredFields.confirmPass = false;
        }

        if (pass.value !== confirmPass.value && pass.value !== '') {
          pass.nextElementSibling.textContent = 'Ваши пароли не совпадают';
          confirmPass.nextElementSibling.textContent =
            'Ваши пароли не совпадают';
          requiredFields.pass = false;
        } else {
          pass.nextElementSibling.textContent = '';
          confirmPass.nextElementSibling.textContent = '';
          requiredFields.pass = true;
        }

        if (!passReg.test(elem.value) && elem.value !== '') {
          elem.nextElementSibling.textContent =
            'Пароль должен содержать 1 цифру, прописную и заглвные буквы а также символ, длина от 8 символов';
          requiredFields.pass = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.pass = true;
        }
        break;

      case 'confirm-pass':
        if (confirmPass.value === pass.value && confirmPass.value !== '') {
          requiredFields.pass = true;
          requiredFields.confirmPass = true;
        } else {
          requiredFields.pass = false;
          requiredFields.confirmPass = false;
        }

        if (confirmPass.value !== pass.value && confirmPass.value !== '') {
          pass.nextElementSibling.textContent = 'Ваши пароли не совпадают';
          confirmPass.nextElementSibling.textContent =
            'Ваши пароли не совпадают';
          requiredFields.confirmPass = false;
        } else {
          pass.nextElementSibling.textContent = '';
          confirmPass.nextElementSibling.textContent = '';
          requiredFields.confirmPass = true;
        }

        if (!passReg.test(elem.value) && elem.value !== '') {
          elem.nextElementSibling.textContent =
            'Пароль должен содержать 1 цифру, прописную и заглвные буквы а также символ, длина от 8 символов';
          requiredFields.confirmPass = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.confirmPass = true;
        }
        break;

      case 'mail':
        if (!emailReg.test(elem.value) && elem.value !== '') {
          elem.nextElementSibling.textContent = 'Введите корректный email';
          requiredFields.mail = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.mail = true;
        }
        break;

      case 'day':
        if (Number(elem.value) > 31 || Number(elem.value) < 1) {
          elem.nextElementSibling.textContent = 'Введите корректное значение';
          requiredFields.day = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.day = true;
        }

        if (day.value > 0 && month.value > 0 && year.value > 0) {
          if (!isValidAge(String(year.value) + '/' + String(month.value) + '/' + String(day.value))) {
            year.nextElementSibling.textContent =
              'Регистрация доступна только с 18 лет';
            requiredFields.validAge = false;
          } else {
            year.nextElementSibling.textContent = '';
            requiredFields.validAge = true;
          }
        }
        break;

      case 'month':
        if (Number(elem.value) > 12 || Number(elem.value) < 1) {
          elem.nextElementSibling.textContent = 'Введите корректное значение';
          requiredFields.month = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.month = true;
        }

        if (day.value > 0 && month.value > 0 && year.value > 0) {
          if (!isValidAge(String(year.value) + '/' + String(month.value) + '/' + String(day.value))) {
            year.nextElementSibling.textContent =
              'Регистрация доступна только с 18 лет';
            requiredFields.validAge = false;
          } else {
            year.nextElementSibling.textContent = '';
            requiredFields.validAge = true;
          }
        }
        break;

      case 'year':
        if (Number(elem.value) > 2021 || Number(elem.value) < 1900) {
          elem.nextElementSibling.textContent = 'Введите корректное значение';
          requiredFields.year = false;
        } else {
          elem.nextElementSibling.textContent = '';
          requiredFields.year = true;
        }

        if (day.value > 0 && month.value > 0 && year.value > 0) {
          if (!isValidAge(String(year.value) + '/' + String(month.value) + '/' + String(day.value))) {
            year.nextElementSibling.textContent =
              'Регистрация доступна только с 18 лет';
            requiredFields.validAge = false;
          } else {
            year.nextElementSibling.textContent = '';
            requiredFields.validAge = true;
          }
        }
        break;
    }
  };

  for (let elem of form.elements) {
    if (elem.classList.contains('form__input')) {
      elem.addEventListener('change', () => {
        validationElem(elem);
      });
    }
  }

  closeMessageBtn.addEventListener('click', () => {
    successMessage.classList.add('visually-hidden');
  });

  const showSuccessMessage = () => {
    successMessage.classList.remove('visually-hidden');
  };

  form.addEventListener('submit', evt => {
    evt.preventDefault();
  });

  submitButton.addEventListener('click', () => {
    showSuccessMessage();
    form.reset();
  });

  const emptyFields = () => {
    for (let elem in requiredFields) {
      if (requiredFields[elem] === false) {
        return false;
      }
    }
    return true;
  };

  form.addEventListener('change', () => {
    if (emptyFields()) {
      disabledSubmitButton(false);
    } else {
      disabledSubmitButton(true);
    }
  });
});
