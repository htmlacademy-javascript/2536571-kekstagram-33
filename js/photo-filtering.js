const imgUploadEffectElement = document.querySelector(
  '.img-upload__effect-level'
);
const imgUploadElement = document.querySelector('.img-upload__preview');
const effectSliderElement = imgUploadEffectElement.querySelector(
  '.effect-level__slider'
);
const effectSliderValueElement = imgUploadEffectElement.querySelector(
  '.effect-level__value'
);
const effectListElement = document.querySelector('.effects__list');
const defaultEffectElement = document.querySelector('#effect-none');

const effectsObject = {
  chrome: [0, 1, 1, 0.1],
  sepia: [0, 1, 1, 0.1],
  marvin: [0, 100, 100, 1],
  phobos: [0, 3, 3, 0.1],
  heat: [1, 3, 3, 0.1],
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderSettings = (min, max, start, step) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
};

const findCheckedInput = () => {
  const allEffectsCheckboxes =
    effectListElement.querySelectorAll('.effects__radio');
  for (const checkbox of allEffectsCheckboxes) {
    if (checkbox.checked) {
      return checkbox;
    }
  }
};

const updateSlider = (activeEffect) => {
  for (const effect in effectsObject) {
    if (effect === activeEffect.value) {
      updateSliderSettings(...effectsObject[effect]);
    }
  }
};

const changePhotoEffect = (activeEffect, value, filter) => {
  if (activeEffect.value === 'none') {
    imgUploadEffectElement.classList.add('hidden');
    imgUploadElement.style.filter = '';
  } else {
    imgUploadEffectElement.classList.remove('hidden');
    imgUploadElement.style.filter = filter;
  }
};

const addNewEffect = (activeEffect, value) => {
  switch (activeEffect.value) {
    case 'none': {
      changePhotoEffect(activeEffect, value, 'none');
      break;
    }
    case 'chrome': {
      changePhotoEffect(activeEffect, value, `grayscale(${value})`);
      break;
    }
    case 'sepia': {
      changePhotoEffect(activeEffect, value, `sepia(${value})`);
      break;
    }
    case 'marvin': {
      changePhotoEffect(activeEffect, value, `invert(${value}%)`);
      break;
    }
    case 'phobos': {
      changePhotoEffect(activeEffect, value, `blur(${value}px)`);
      break;
    }
    case 'heat': {
      changePhotoEffect(activeEffect, value, `brightness(${value})`);
      break;
    }
  }
};

const updateSilderEffect = () => {
  effectSliderElement.noUiSlider.on('update', () => {
    effectSliderValueElement.value = effectSliderElement.noUiSlider.get();
    const checkedInput = findCheckedInput();
    addNewEffect(checkedInput, effectSliderElement.noUiSlider.get());
  });
};

const changeFilter = () => (e) => {
  if (e.target.tagName === 'INPUT') {
    const checkedInput = findCheckedInput();
    updateSlider(checkedInput);
    addNewEffect(checkedInput, effectSliderElement.noUiSlider.get());
  }
  updateSilderEffect();
};

const changeFilterHandler = () => {
  effectListElement.addEventListener('change', changeFilter(true));
};

const removeFilterHandler = () => {
  effectListElement.removeEventListener('change', changeFilter(true));
};

const resetFilterSettings = () =>{
  defaultEffectElement.checked = true;
  addNewEffect(defaultEffectElement,0);
};

export {changeFilterHandler,removeFilterHandler,resetFilterSettings};
