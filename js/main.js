const PHOTO_COUNTER = 25;
const MESSAGES = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES = [
  'Иван',
  'Cтепан',
  'Василий',
  'Йосиф',
  'Владимир',
  'Джордж'
];
const DESCRIPTIONS = [
  'Хорошее фото',
  'Идеально фото'
];

const objIds = [];
const commentIds = [];

const getRandomNumber = (min, max, obj = undefined, comment = undefined) => {
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

  if (obj) {
    return findDubl(objIds);
  } else if (comment) {
    return findDubl(commentIds);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};


const createArr = () => (
  {
    id: getRandomNumber(1, 1000, undefined, true),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg.`,
    message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  });

const createObject = () => ({
  id: getRandomNumber(1, 25, true),
  url: `photos/${getRandomNumber(1, 25)}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({ length: getRandomNumber(0, 30) }, createArr),
});

const objects = Array.from({ length: PHOTO_COUNTER }, createObject);

objects.forEach();
