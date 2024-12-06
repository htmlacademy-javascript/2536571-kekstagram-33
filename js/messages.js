import { resetFile, isEscapeKey } from './utils';
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

function closeSuccesMessage(succesMessage) {
  document.removeEventListener('keydown', onEscKeydownSucces);
  succesMessage.remove();
  addEscKeydownHandler();
}

function onEscKeydownSucces (e) {
  const succesMessage = document.querySelector('.success');
  if (isEscapeKey(e)) {
    closeSuccesMessage(succesMessage);
  }
}

const succesMessageHandler = (succesMessage) => {
  succesMessage
    .querySelector('.success__button')
    .addEventListener('click', () => closeSuccesMessage(succesMessage));
  succesMessage.addEventListener('click', (e) => {
    if (e.target.className !== 'success__inner') {
      closeSuccesMessage(succesMessage);
    }
  });
  document.addEventListener('keydown', onEscKeydownSucces);
  removeEscKeydownHandler();
};

const succesMessagePost = () => {
  const succesMessage = succesMessageElement.cloneNode(true);
  document.body.append(succesMessage);
  succesMessageHandler(succesMessage);
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

function onEscKeydownError (e) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(e)) {
    closeSuccesMessage(errorMessage);
  }
}


const resetFormData = () => {
  resetForm();
  resetFile();
  resetScalingSettings();
  resetFilterSettings();
};

const addSuccesMessage = () => {
  resetFormData();
  succesMessagePost();
};

const addErrorMessage = () => errorMessagePost();

export { addSuccesMessage,addErrorMessage, errorMessageGet,resetFormData };
