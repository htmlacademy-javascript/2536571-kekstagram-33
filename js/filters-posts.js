import { generatePhotoByTemplate } from "./render-mini-photos";
import { getRandomNumber } from "./generate-photos-data";
import { debounce, throttle } from "./utils";
const RANDOM_LENGTH = 10;

const defaultButtonElememt = document.querySelector("#filter-default");
const randomButtonElement = document.querySelector("#filter-random");
const commentButtonElement = document.querySelector("#filter-discussed");

let buttons = [defaultButtonElememt, randomButtonElement, commentButtonElement];
let photosData;

const resetPhotos = () => {
  const photosElements = document.querySelectorAll(".picture");
  for (let photo of photosElements) {
    photo.remove();
  }
};

const filterPhotoByDefault = (posts) => {
  addActiveCLass(defaultButtonElememt);
  resetPhotos();
  photosData = posts;
  generatePhotoByTemplate(posts);
};

const addActiveCLass = (elemButton) => {
  let unactiveButtons = buttons.filter((f) => f !== elemButton);
  for (let button of unactiveButtons) {
    button.classList.remove("img-filters__button--active");
  }
  elemButton.classList.add("img-filters__button--active");
};

const filterPhotoByRandom = (posts) => {
  addActiveCLass(randomButtonElement);
  resetPhotos();
  let newPostsArr = [];
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    let randomNumber = getRandomNumber(
      0,
      posts.length - 1,
      newPostsArr.map((f) => f.number)
    );
    newPostsArr.push({ post: posts[randomNumber], number: randomNumber });
  }
  generatePhotoByTemplate(newPostsArr.map((f) => f.post));
};

const compareFunction = (a, b) => {
  return b.comments.length - a.comments.length;
};
const filterPhotoByLikes = (posts) => {
  addActiveCLass(commentButtonElement);
  resetPhotos();
  let newPostsArr = posts.slice();
  newPostsArr.sort(compareFunction);

  generatePhotoByTemplate(newPostsArr);
};

defaultButtonElememt.addEventListener(
  "click",
  debounce(() => filterPhotoByDefault(photosData))
);
randomButtonElement.addEventListener(
  "click",
  debounce(() => filterPhotoByRandom(photosData))
);
commentButtonElement.addEventListener(
  "click",
  debounce(() => filterPhotoByLikes(photosData))
);

export { filterPhotoByDefault, filterPhotoByRandom, filterPhotoByLikes };
