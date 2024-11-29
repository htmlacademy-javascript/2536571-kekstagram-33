const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadHashtagElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadCommentElement = imgUploadFormElement.querySelector('.text__description');

const addHashtagValidator = (pristine) => {
  pristine.addValidator(
    imgUploadFormElement.querySelector('.text__hashtags'),
    validateHashtag,
    'Неверный формат данных'
  );
};

const addComentValidator = (pristine) => {
  pristine.addValidator(
    imgUploadFormElement.querySelector('.text__description'),
    validateComment,
    'Количество символов превышает 140'
  );
};


function validateImageForm() {
  const pristine = new Pristine(imgUploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  addHashtagValidator(pristine);
  addComentValidator(pristine);
}

function validateComment() {
  if (imgUploadCommentElement.value.length > 140) {
    return false;
  }
  return true;
}

function validateHashtag() {
  const hashTagReg = new RegExp(/^#[a-zа-яё0-9]{1,19}$/i);
  const hashTags = imgUploadHashtagElement.value.split(' ').map((f) => f.trim());
  if (hashTags.length <= 5) {
    if (hashTags.length === 1 && !hashTags[0]) {
      return true;
    }
    for (let i = 0; i < hashTags.length; i++) {
      if (
        hashTagReg.test(hashTags[i]) === false ||
        hashTags.filter((f) => f === hashTags[i]).length > 1
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export { validateImageForm };
