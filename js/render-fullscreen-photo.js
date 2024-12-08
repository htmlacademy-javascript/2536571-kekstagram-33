import { clearPhotoElement, isEscapeKey } from './utils';
import {drawMoreComments} from './render-comments.js';
import './upload-new-photo.js';

const fullScreenPictureSection = document.querySelector('.big-picture');
const fullScreenPictureElement = fullScreenPictureSection.querySelector('.big-picture__img img');
const commentsCountElements = fullScreenPictureSection.querySelector('.social__comment-count');
const pictureLikesCountElement = fullScreenPictureSection.querySelector('.likes-count');
const pictureCommentCountElement = commentsCountElements.querySelector('.social__comment-total-count');
const pictureCommentsListElement = fullScreenPictureSection.querySelector('.social__comments');
const pictureDescriptionElement = fullScreenPictureSection.querySelector('.social__caption');
const commentsLoaderElements = fullScreenPictureSection.querySelector('.comments-loader');
const inputElement = fullScreenPictureSection.querySelector('.social__footer-text');
const buttonCloseElement = fullScreenPictureSection.querySelector('.big-picture__cancel');

let photoComments = [];

function onEscKeydown(evt) {
  buttonCloseElement.removeEventListener('click', closeFullScreenPhoto);
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullScreenPhoto();
  }
}

const openFullScreenPhoto = () => {
  fullScreenPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const drawBigPicture = ({ url, likes, comments, description }) => {
  clearPhotoElement(inputElement, pictureCommentsListElement);
  fullScreenPictureElement.src = url;
  pictureLikesCountElement.textContent = likes;
  pictureCommentCountElement.textContent = String(comments.length);
  pictureDescriptionElement.textContent = description;
};

function closeFullScreenPhoto() {
  fullScreenPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

buttonCloseElement.addEventListener('click', () => {
  closeFullScreenPhoto();
});

commentsLoaderElements.addEventListener('click', () =>
  drawMoreComments(photoComments));

const drawFullScreenPicture = ({ url, likes, comments, description }) => {
  drawBigPicture({ url, likes, comments, description });
  openFullScreenPhoto();
  photoComments = comments;
  if(photoComments){
    drawMoreComments(photoComments);
  }
};


export { drawFullScreenPicture };
