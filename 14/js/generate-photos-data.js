import { PHOTO_COUNTER, NAMES, DESCRIPTIONS, MESSAGES } from './photo-sources';

const objIds = [];
const commentIds = [];

const getRandomNumber = (min, max, arrayFindDubl) => {
  const findDubl = function getUniqNumber(arr) {
    const bool = true;
    let counter = Math.floor(Math.random() * (max - min + 1) + min);
    while (bool) {
      if (arr.includes(counter)) {
        counter = Math.floor(Math.random() * (max - min + 1) + min);
        continue;
      }
      arr.push(counter);
      break;
    }
    return counter;
  };

  if (arrayFindDubl) {
    return findDubl(arrayFindDubl);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createCommentData = () => ({
  id: getRandomNumber(1, 1000, objIds),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg.`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)],
});

const createPhotoData = () => ({
  id: getRandomNumber(1, 25, commentIds),
  url: `photos/${getRandomNumber(1, 25)}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({ length: getRandomNumber(0, 30) }, createCommentData),
});

const photos = () => Array.from({ length: PHOTO_COUNTER }, createPhotoData);

export { photos };
