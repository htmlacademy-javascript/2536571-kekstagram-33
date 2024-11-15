const checkLength = (line, length) => line.length <= length;

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

const isEscapeKey = (evt) => evt.key === 'Escape';

checkLength('проверяемая строка', 20);
checkPalindrome('ДовОд');
getNumber('2023 год');
checkDurationMeeting('08:00', '17:30', '14:00', 90);

export { clearPhotoElement, isEscapeKey };
