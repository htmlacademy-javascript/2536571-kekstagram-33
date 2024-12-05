import { isEscapeKey, clearInputElement } from './utils.js';
import { scaleImageHandler,removeScaleImageHandler,resetScalingSettings } from './photo-scaling.js';
import {
  addHandlerSubmitForm,
  removeHandlerSubmitForm,
  resetForm,
} from './validate-text-image.js';
import {changeFilterHandler,removeFilterHandler ,resetFilterSettings} from './photo-filtering.js';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement =
  imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadFormElement.querySelector(
  '.img-upload__overlay'
);
const imgUploadCancelButton = imgUploadFormElement.querySelector(
  '.img-upload__cancel'
);
const imgUploadHashtagElement =
  imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentElement =
  imgUploadFormElement.querySelector('.text__description');

function onEscKeydown(evt) {
  imgUploadCancelButton.removeEventListener('click', closeUploadPhoto);
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPhoto();
  }
}

function closeUploadPhoto() {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearInputElement(imgUploadInputElement);
  removeHandlerSubmitForm();
  removeScaleImageHandler();
  removeFilterHandler();
  resetForm();
  document.removeEventListener('keydown', onEscKeydown);
}

const stopCloseEvent = (event) => {
  if (isEscapeKey(event)) {
    event.stopPropagation();
  }
};

const removeCommentEscKeydownHandler = () => {
  imgUploadCommentElement.addEventListener('keydown', stopCloseEvent);
};

const removeHashTagEscKeydownHandler = () => {
  imgUploadHashtagElement.addEventListener('keydown', stopCloseEvent);
};

removeCommentEscKeydownHandler();
removeHashTagEscKeydownHandler();

const openUploadPhoto = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  addHandlerSubmitForm();
  resetScalingSettings();
  scaleImageHandler();
  resetFilterSettings();
  changeFilterHandler();
};

imgUploadCancelButton.addEventListener('click', () => closeUploadPhoto());
imgUploadInputElement.addEventListener('change', () => openUploadPhoto());
