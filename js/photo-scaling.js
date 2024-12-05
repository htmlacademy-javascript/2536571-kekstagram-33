const MAX_SCALING_VALUE = 100;
const MIN_SCALING_VALUE = 25;
const SCALING_STEP = 25;
const scaleSmallerButtonElement = document.querySelector(
  '.scale__control--smaller'
);
const scaleBiggerButtonElement = document.querySelector(
  '.scale__control--bigger'
);
const percentageScaleValueElement = document.querySelector(
  '.scale__control--value'
);
const imgPreveiwElement = document.querySelector('.img-upload__preview img');

function transformPhoto(percentageScaleValue) {
  const newPercentageValue = percentageScaleValue / 100;
  imgPreveiwElement.style.transform = `scale(${newPercentageValue})`;
  percentageScaleValueElement.value = `${percentageScaleValue}%`;
}

function getPhotoScalingValue(boundarValue) {
  const percentageScaleValue = Number(
    percentageScaleValueElement.value.split('%')[0]
  );
  if (percentageScaleValue === boundarValue) {
    return undefined;
  }
  return percentageScaleValue;
}

function scaleBigger() {
  let scaleValue = getPhotoScalingValue(MAX_SCALING_VALUE);
  if (scaleValue) {
    scaleValue += SCALING_STEP;
    transformPhoto(scaleValue);
  }
}

function scaleSmaller() {
  let scaleValue = getPhotoScalingValue(MIN_SCALING_VALUE);
  if (scaleValue) {
    scaleValue -= SCALING_STEP;
    transformPhoto(scaleValue);
  }
}

function scaleImageHandler() {
  scaleBiggerButtonElement.addEventListener('click', scaleBigger);
  scaleSmallerButtonElement.addEventListener('click', scaleSmaller);
}

function removeScaleImageHandler() {
  scaleBiggerButtonElement.removeEventListener('click', scaleBigger);
  scaleSmallerButtonElement.removeEventListener('click', scaleSmaller);
}

function resetScalingSettings() {
  transformPhoto(100);
}
export { scaleImageHandler, removeScaleImageHandler,resetScalingSettings };
