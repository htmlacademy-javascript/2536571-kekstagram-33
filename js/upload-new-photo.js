import { isEscapeKey, clearInputElement } from './utils.js';
import { scaleImageHandler,removeScaleImageHandler,resetScalingSettings } from './photo-scaling.js';
import {
  addHandlerSubmitForm,
  removeHandlerSubmitForm,
} from './validate-text-image.js';
import {changeFilterHandler,removeFilterHandler ,resetFilterSettings} from './photo-filtering.js';
import {resetFormData} from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement =
  imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadFormElement.querySelector(
  '.img-upload__overlay'
);
const imgUploadCancelButton = imgUploadFormElement.querySelector(
  '.img-upload__cancel'
);
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadHashtagElement =
  imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentElement =
  imgUploadFormElement.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');
const effectPreviewElement = document.querySelectorAll('.effects__preview')

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
  resetFormData();
  document.removeEventListener('keydown', onEscKeydown);
}

const removeEscKeydownHandler = ()=>document.removeEventListener('keydown', onEscKeydown);
const addEscKeydownHandler = ()=>document.addEventListener('keydown', onEscKeydown);

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

const uploadNewPhoto = () =>{
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches){
    const imgUrl =  URL.createObjectURL(file);
    imgUploadPreview.src = URL.createObjectURL(file);
    effectPreviewElement.forEach(effectPreview=>{
      effectPreview.style.backgroundImage = `url(${imgUrl})`;
    })
  }
};

const openUploadPhoto = () => {
  uploadNewPhoto();
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  imgUploadButton.disabled = false;
  addHandlerSubmitForm();
  resetScalingSettings();
  scaleImageHandler();
  resetFilterSettings();
  changeFilterHandler();
};

imgUploadCancelButton.addEventListener('click', () => closeUploadPhoto());
imgUploadInputElement.addEventListener('change', () => openUploadPhoto());

export {removeEscKeydownHandler,addEscKeydownHandler,closeUploadPhoto};
