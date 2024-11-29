const NEW_PHOTO_COUNTER = 5;


const fullScreenPictureSection = document.querySelector('.big-picture');
const commentsCountElements = fullScreenPictureSection.querySelector('.social__comment-count');
const pictureCommentsListElement = fullScreenPictureSection.querySelector('.social__comments');
const pictureShownCommentsElement = commentsCountElements.querySelector('.social__comment-shown-count');
const commentTemplate = fullScreenPictureSection.querySelector('.social__comment');
const commentsLoaderElements = fullScreenPictureSection.querySelector('.comments-loader');
const photoCommentFragment = document.createDocumentFragment();

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

function drawMoreComments(comments){
  if(!comments.length){
    return;
  }
  if(pictureCommentsListElement.children.length + NEW_PHOTO_COUNTER < comments.length){
    drawComments(comments.slice(pictureCommentsListElement.children.length,
      pictureCommentsListElement.children.length + NEW_PHOTO_COUNTER));
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

export {drawMoreComments};
