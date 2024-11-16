import { clearPhotoElement, isEscapeKey } from './utils';

const fullscreenPictureSection = document.querySelector('.big-picture');
const fullscreenPictureElement = fullscreenPictureSection.querySelector(
  '.big-picture__img img'
);
const commentsCountElements = document.querySelector('.social__comment-count');
const pictureLikesCountElement = document.querySelector('.likes-count');
const pictureCommentCountElement = commentsCountElements.querySelector(
  '.social__comment-total-count'
);
const pictureCommentsListElement = document.querySelector('.social__comments');
const pictureDescriptionElement = document.querySelector('.social__caption');
const commentsLoaderElements = document.querySelector('.comments-loader');
const inputElement = document.querySelector('.social__footer-text');
const buttonCloseElement = fullscreenPictureSection.querySelector(
  '.big-picture__cancel'
);
const photoCommentFragment = document.createDocumentFragment();
const commentTemplate =
  pictureCommentsListElement.querySelector('.social__comment');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPhoto();
  }
};

const closeFullscreenPhoto = () => {
  fullscreenPictureSection.classList.add('hidden');
  commentsCountElements.classList.remove('hidden');
  commentsLoaderElements.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const openFullscreenPhoto = () => {
  fullscreenPictureSection.classList.remove('hidden');
  commentsCountElements.classList.add('hidden');
  commentsLoaderElements.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const drawBigPicture = ({ url, likes, comments, description }) => {
  fullscreenPictureElement.src = url;
  pictureLikesCountElement.textContent = likes;
  pictureCommentCountElement.textContent = String(comments.length);
  pictureDescriptionElement.textContent = description;
};

const drawComments = (comments) => {
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    photoCommentFragment.append(commentElement);
  });
  pictureCommentsListElement.appendChild(photoCommentFragment);
};

const drawFullScreenPicture = ({ url, likes, comments, description }) => {
  clearPhotoElement(inputElement, pictureCommentsListElement);
  drawBigPicture({ url, likes, comments, description });
  openFullscreenPhoto();
  drawComments(comments);
};

const closeFullScreenPhotoButton = () =>
  buttonCloseElement.addEventListener('click', () => {
    closeFullscreenPhoto();
  });

export { drawFullScreenPicture, closeFullScreenPhotoButton };
