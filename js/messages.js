import { resetFile, isEscapeKey,resetImg } from './utils';
import { resetForm } from './validate-text-image';
import { resetScalingSettings } from './photo-scaling';
import { resetFilterSettings } from './photo-filtering';
import {
  removeEscKeydownHandler,
  addEscKeydownHandler,
} from './upload-new-photo';

const errorMessageElement = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');
const succesMessageElement = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorPostMessageElement = document
  .querySelector('#error')
  .content.querySelector('.error');

const errorMessageGet = () => {
  const newErrorMessage = errorMessageElement.cloneNode(true);
  document.body.append(newErrorMessage);
  setTimeout(() => newErrorMessage.remove(), 5000);
};

function closeSuccesMessage(successMessage) {
  document.removeEventListener('keydown', onEscKeydownSucces);
  successMessage.remove();
  addEscKeydownHandler();
}

function onEscKeydownSucces (e) {
  const successMessage = document.querySelector('.success');
  if (isEscapeKey(e)) {
    closeSuccesMessage(successMessage);
  }
}

const succesMessageHandler = (successMessage) => {
  successMessage
    .querySelector('.success__button')
    .addEventListener('click', () => closeSuccesMessage(successMessage));
  successMessage.addEventListener('click', (e) => {
    if (e.target.className !== 'success__inner') {
      closeSuccesMessage(successMessage);
    }
  });
  document.addEventListener('keydown', onEscKeydownSucces);
  removeEscKeydownHandler();
};

const successMessagePost = () => {
  const successMessage = succesMessageElement.cloneNode(true);
  document.body.append(successMessage);
  succesMessageHandler(successMessage);
};

const errorMessagePost = () => {
  const errorMessage = errorPostMessageElement.cloneNode(true);
  document.body.append(errorMessage);
  errorMessageHandler(errorMessage);
};

const closeErrorMessage = (error) => {
  error.remove();
  addEscKeydownHandler();
  document.removeEventListener('keydown',onEscKeydownError);
};

function onEscKeydownError (e) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(e)) {
    closeErrorMessage(errorMessage);
  }
}

function errorMessageHandler (errorMessage) {
  errorMessage
    .querySelector('.error__button')
    .addEventListener('click', () => closeErrorMessage(errorMessage));
  errorMessage.addEventListener('click', (e) => {
    if (e.target.className !== 'error__inner') {
      closeErrorMessage(errorMessage);
    }
  });
  document.addEventListener('keydown', onEscKeydownError);
  removeEscKeydownHandler();
}

const resetFormData = () => {
  resetImg();
  resetForm();
  resetFile();
  resetScalingSettings();
  resetFilterSettings();
};

const addSuccessMessage = () => {
  resetFormData();
  successMessagePost();
};

const addErrorMessage = () => errorMessagePost();

export { addSuccessMessage,addErrorMessage, errorMessageGet,resetFormData };
