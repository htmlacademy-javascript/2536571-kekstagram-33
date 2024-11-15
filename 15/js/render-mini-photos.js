import { photos } from './generate-photos-data.js';
import {
  drawFullscreenPicture,
  closeFullscreenPhotoButton,
} from './render-fullscreen-photo.js';

const photosListElement = document.querySelector('.pictures');
const photoTemplateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

const photosData = photos();

const generatePhotoByTemplate = () => {
  photosData.forEach(({ url, description, likes, comments }) => {
    const photoElement = photoTemplateElement.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').alt = comments.length;
    photoListFragment.append(photoElement);
    photoElement.addEventListener('click', () => {
      drawFullscreenPicture({ url, likes, comments, description });
      closeFullscreenPhotoButton();
    });
  });
  photosListElement.appendChild(photoListFragment);
};

export { generatePhotoByTemplate };
