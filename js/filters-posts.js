import { generatePhotoByTemplate } from './render-mini-photos';
import { getRandomNumber } from './generate-photos-data';
import { debounce } from './utils';
const RANDOM_LENGTH = 10;

const defaultButtonElememt = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const commentButtonElement = document.querySelector('#filter-discussed');

const buttons = [defaultButtonElememt, randomButtonElement, commentButtonElement];
let photosData;

const resetPhotos = () => {
  const photosElements = document.querySelectorAll('.picture');
  for (const photo of photosElements) {
    photo.remove();
  }
};

const addActiveCLass = (elemButton) => {
  const unactiveButtons = buttons.filter((f) => f !== elemButton);
  for (const button of unactiveButtons) {
    button.classList.remove('img-filters__button--active');
  }
  elemButton.classList.add('img-filters__button--active');
};

const filterPhotoByDefault = (posts) => {
  addActiveCLass(defaultButtonElememt);
  resetPhotos();
  photosData = posts;
  generatePhotoByTemplate(posts);
};

const filterPhotoByRandom = (posts) => {
  addActiveCLass(randomButtonElement);
  resetPhotos();
  const newPostsArr = [];
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    const randomNumber = getRandomNumber(
      0,
      posts.length - 1,
      newPostsArr.map((f) => f.number)
    );
    newPostsArr.push({ post: posts[randomNumber], number: randomNumber });
  }
  generatePhotoByTemplate(newPostsArr.map((f) => f.post));
};

const compareFunction = (a, b) => b.comments.length - a.comments.length;
const filterPhotoByLikes = (posts) => {
  addActiveCLass(commentButtonElement);
  resetPhotos();
  const newPostsArr = posts.slice();
  newPostsArr.sort(compareFunction);

  generatePhotoByTemplate(newPostsArr);
};

defaultButtonElememt.addEventListener(
  'click',
  debounce(() => filterPhotoByDefault(photosData))
);
randomButtonElement.addEventListener(
  'click',
  debounce(() => filterPhotoByRandom(photosData))
);
commentButtonElement.addEventListener(
  'click',
  debounce(() => filterPhotoByLikes(photosData))
);

export { filterPhotoByDefault, filterPhotoByRandom, filterPhotoByLikes };
