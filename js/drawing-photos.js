import { photos } from "./generate-photos-data.js";

const photosList = document.querySelector(".pictures");
const photoTemplate = document.querySelector("#picture").content.querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

const photosData = photos();

const generatePhotoByTemplate = () => {
  photosData.forEach(({url,description,likes,comments}) => {
    let photo = photoTemplate.cloneNode(true);
    photo.querySelector(".picture__img").src = url;
    photo.querySelector(".picture__img").alt = description;
    photo.querySelector(".picture__likes").textContent = likes;
    photo.querySelector(".picture__comments").alt = comments.length;
    photoListFragment.append(photo);
  });
  photosList.appendChild(photoListFragment);
};

generatePhotoByTemplate();

export {generatePhotoByTemplate};
