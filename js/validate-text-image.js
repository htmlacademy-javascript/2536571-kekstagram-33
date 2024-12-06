import {postData} from './api.js';
import {addSuccesMessage,addErrorMessage} from './messages.js';

const COMMENT_MAX_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 5;
const HASHTAG_ERROR = 'Неверный формат данных';
const COMMENT_ERROR = `Количество символов превышает ${COMMENT_MAX_LENGTH}`;

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadHashtagElement =
  imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentElement =
  imgUploadFormElement.querySelector('.text__description');

const pristine = new Pristine(
  imgUploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  },
  false
);

const hashTagReg = new RegExp(/^#[a-zа-яё0-9]{1,19}$/i);

const hashTagRegError = (hashTags) => hashTags.some((f) => hashTagReg.test(f) === false);


const hashTagFindDublicate = (hashTags) => hashTags.some((item) => hashTags.filter((f) => f === item).length > 1);


const checkHashTagLength = (hashTags) => {
  if (hashTags.length <= MAX_HASHTAG_LENGTH) {
    return false;
  }
  return true;
};


const checkCommentLength = (comment) => comment.length > COMMENT_MAX_LENGTH;

const validateHashTagRules = [
  checkHashTagLength,
  hashTagFindDublicate,
  hashTagRegError,
];
const validateCommentRules = [checkCommentLength];

function validateComment() {
  const comment = imgUploadCommentElement.value;
  return !validateCommentRules.some((f) => f(comment));
}

function validateHashtag() {
  const hashTags = imgUploadHashtagElement.value
    .split(' ')
    .map((f) => f.trim());
  if(!hashTags[0] && hashTags.length === 1){
    return true;
  }
  return !validateHashTagRules.some((f) => f(hashTags));
}

const addHashtagValidator = () => {
  pristine.addValidator(
    imgUploadFormElement.querySelector('.text__hashtags'),
    validateHashtag,
    HASHTAG_ERROR
  );
};

const addComentValidator = () => {
  pristine.addValidator(
    imgUploadFormElement.querySelector('.text__description'),
    validateComment,
    COMMENT_ERROR
  );
};

const submitForm = (e) => {
  e.preventDefault();
  const formInfo = new FormData(e.target);
  if (pristine.validate()) {
    postData(addSuccesMessage,addErrorMessage,formInfo);
  }
};

const addHandlerSubmitForm = () =>
  imgUploadFormElement.addEventListener('submit', submitForm);

const removeHandlerSubmitForm = () =>
  imgUploadFormElement.removeEventListener('submit', submitForm);

const resetForm = () =>{
  imgUploadCommentElement.value = '';
  imgUploadHashtagElement.value = '';
  pristine.reset();
};

addHashtagValidator();
addComentValidator();

export { addHandlerSubmitForm, removeHandlerSubmitForm, resetForm };
