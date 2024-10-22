function checkLength(line, length) {
  return line.length <= length;
}

function checkPalindrome(word) {
  const newWord = word.toLowerCase().replaceAll(' ', '');
  let reversedWord = '';
  for (let i = newWord.length - 1; i >= 0; i--) {
    reversedWord += newWord[i];
    console.log(reversedWord)
  }
  return reversedWord === newWord;
}

function getNumber(line) {
  let result = '';
  line = line.replaceAll(' ','');
  for (let i = 0; i < line.length; i++) {
    let number = Number(line[i]);
    if (!isNaN(number)) {
        result += number < 0 ? -number : number;
    }
  }
  return result || NaN;
}
