import { clearPhotoElement, isEscapeKey } from './utils';

const fullScreenPictureSection = document.querySelector('.big-picture');
const fullScreenPictureElement = fullScreenPictureSection.querySelector('.big-picture__img img');
const commentsCountElements = fullScreenPictureSection.querySelector('.social__comment-count');
const pictureLikesCountElement = fullScreenPictureSection.querySelector('.likes-count');
const pictureCommentCountElement = commentsCountElements.querySelector('.social__comment-total-count');
const pictureShownCommentsElement = commentsCountElements.querySelector('.social__comment-shown-count');
const pictureCommentsListElement = fullScreenPictureSection.querySelector('.social__comments');
const pictureDescriptionElement = fullScreenPictureSection.querySelector('.social__caption');
const commentsLoaderElements = fullScreenPictureSection.querySelector('.comments-loader');
const inputElement = fullScreenPictureSection.querySelector('.social__footer-text');
const buttonCloseElement = fullScreenPictureSection.querySelector('.big-picture__cancel');
const commentTemplate = fullScreenPictureSection.querySelector('.social__comment');
const photoCommentFragment = document.createDocumentFragment();

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

const drawComments = (comments) => {
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    photoCommentFragment.append(commentElement);
  });
  pictureCommentsListElement.appendChild(photoCommentFragment);
  pictureShownCommentsElement.textContent = pictureCommentsListElement.children.length;
};

function closeFullScreenPhoto() {
  fullScreenPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}


function drawMoreComments(comments){
  if(!comments.length || comments.length === pictureCommentsListElement.children.length){
    return;
  }
  if(pictureCommentsListElement.children.length + 5 < comments.length){
    drawComments(comments.slice(pictureCommentsListElement.children.length,
      pictureCommentsListElement.children.length + 5));
  } else{
    drawComments(comments.slice(pictureCommentsListElement.children.length,
      comments.length));
  }
  if(pictureCommentsListElement.children.length === comments.length) {
    commentsLoaderElements.classList.add('hidden');
  } else{
    commentsLoaderElements.classList.remove('hidden');
  }
}


buttonCloseElement.addEventListener('click', () => {
  closeFullScreenPhoto();
});

commentsLoaderElements.addEventListener('click', () =>
  drawMoreComments(photoComments));

const drawFullScreenPicture = ({ url, likes, comments, description }) => {
  drawBigPicture({ url, likes, comments, description });
  openFullScreenPhoto();
  drawMoreComments(comments);
  photoComments = comments;
};

export { drawFullScreenPicture };
