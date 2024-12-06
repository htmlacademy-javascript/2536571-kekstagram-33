import {resetForm} from './validate-text-image'
import {resetScalingSettings} from './photo-scaling'
import {resetFilterSettings} from './photo-filtering'

const checkLength = (line, length) => line.length <= length;
const errorMessageElement = document.querySelector('#data-error').content.querySelector('.data-error');
const succesMessageElement = document.querySelector('#success').content.querySelector('.success');
const fileLoader = document.querySelector('.img-upload__input');

const checkPalindrome = (word) => {
  const newWord = word.toLowerCase().replaceAll(' ', '');
  let reversedWord = '';
  for (let i = newWord.length - 1; i >= 0; i--) {
    reversedWord += newWord[i];
  }
  return reversedWord === newWord;
};

const getNumber = (line) => {
  let result = '';
  line = line.replaceAll(' ', '');
  for (let i = 0; i < line.length; i++) {
    const number = Number(line[i]);
    if (!isNaN(number)) {
      result += number < 0 ? -number : number;
    }
  }
  return result || NaN;
};

const getNumberofMinites = (time) => {
  const minutes = time.split(':');
  return Number(minutes[0]) * 60 + Number(minutes[1]);
};

const checkDurationMeeting = (
  startWorkTime,
  endWorkTime,
  startMeeteng,
  meetingDuration
) =>
  getNumberofMinites(startMeeteng) + meetingDuration <=
    getNumberofMinites(endWorkTime) &&
  getNumberofMinites(startMeeteng) + meetingDuration >=
    getNumberofMinites(startWorkTime);

const clearPhotoElement = (input, pictureCommentsList) => {
  input.value = '';
  pictureCommentsList.innerHTML = '';
};

const clearInputElement = (input) => {
  input.value = '';
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorMessage = () =>{
  console.log('одна ошибка')
  let newErrorMessage = errorMessageElement.cloneNode(true);
  document.body.append(newErrorMessage);
  setTimeout(()=>newErrorMessage.remove(),5000)
}

const succesMessagePost = () =>{
  const succesMessage = succesMessageElement.cloneNode(true);
  document.body.append(succesMessage);
  console.log('12')
}

const resetFile = ()=>fileLoader.setAttribute('value',null);

checkLength('проверяемая строка', 20);
checkPalindrome('ДовОд');
getNumber('2023 год');
checkDurationMeeting('08:00', '17:30', '14:00', 90);

export { clearPhotoElement, isEscapeKey ,clearInputElement,resetFile};
