import {
  drawFullScreenPicture,
} from './render-fullscreen-photo.js';

const photosListElement = document.querySelector('.pictures');
const photoTemplateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const photoFilters = document.querySelector('.img-filters');
const photoListFragment = document.createDocumentFragment();

const generatePhotoByTemplate = (photosData) => {
  photosData.forEach(({ url, description, likes, comments }) => {
    const photoElement = photoTemplateElement.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.append(photoElement);
    photoElement.addEventListener('click', () => {
      drawFullScreenPicture({ url, likes, comments, description });
    });
  });
  photosListElement.appendChild(photoListFragment);
};

const showFilters = ()=> photoFilters.classList.remove('img-filters--inactive');
export { generatePhotoByTemplate,showFilters };
