function checkLength(line, length) {
  return line.length <= length;
}

function checkPalindrome(word) {
  const newWord = word.toLowerCase().replaceAll(' ', '');
  let reversedWord = '';
  for (let i = newWord.length - 1; i >= 0; i--) {
    reversedWord += newWord[i];
  }
  return reversedWord === newWord;
}

function getNumber(line) {
  let result = '';
  line = line.replaceAll(' ', '');
  for (let i = 0; i < line.length; i++) {
    const number = Number(line[i]);
    if (!isNaN(number)) {
      result += number < 0 ? -number : number;
    }
  }
  return result || NaN;
}

checkLength('проверяемая строка', 20);
checkPalindrome('ДовОд');
getNumber('2023 год');

