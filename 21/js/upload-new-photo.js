import { isEscapeKey, clearInputElement } from './utils.js';
import {scaleImageHandler} from './photo-scaling.js';
import {validateImageForm} from './validate-text-image.js';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadFormElement.querySelector('.img-upload__cancel');
const imgUploadHashtagElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentElement = imgUploadFormElement.querySelector('.text__description');


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
  document.removeEventListener('keydown', onEscKeydown);
}

const removeCommentEscKeydown = () =>{
  imgUploadCommentElement.addEventListener('focus', ()=>{
    document.removeEventListener('keydown', onEscKeydown);
  });
};

const removeHashTagEscKeydown = ()=>{
  imgUploadHashtagElement.addEventListener('focus', ()=>{
    document.removeEventListener('keydown', onEscKeydown);
  });
};

const openUploadPhoto = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  validateImageForm();
  removeCommentEscKeydown();
  removeHashTagEscKeydown();
  scaleImageHandler();
};

imgUploadCancelButton.addEventListener('click', () => closeUploadPhoto());
imgUploadInputElement.addEventListener('change', () => openUploadPhoto());

