const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const percentageScaleValueElement = document.querySelector('.scale__control--value');
const imgPreveiwElement = document.querySelector('.img-upload__preview');


function scaleBigger(){
  const percentageScale = Number(percentageScaleValueElement.value.split('%')[0]);
  if(percentageScale === 100){
    return;
  }
  const percentageScaleValue = Number(percentageScaleValueElement.value.split('%')[0]) + 25;
  const percentageValue = percentageScaleValue / 100;
  imgPreveiwElement.style.transform = `scale(${percentageValue})`;
  percentageScaleValueElement.value = `${percentageScaleValue}%` ;
}

function scaleSmaller(){
  const percentageScale = Number(percentageScaleValueElement.value.split('%')[0]);
  if(percentageScale === 25){
    return;
  }
  const percentageScaleValue = Number(percentageScaleValueElement.value.split('%')[0]) - 25;
  imgPreveiwElement.style.transform = `scale(0.${percentageScaleValue})`;
  percentageScaleValueElement.value = `${percentageScaleValue}%` ;
}

const scaleBiggerHandler = ()=>{
  scaleBiggerButtonElement.addEventListener('click', scaleBigger);
};

const scaleSmallerHandler = ()=>{
  scaleSmallerButtonElement.addEventListener('click',scaleSmaller);
};

function scaleImageHandler(){
  scaleBiggerHandler();
  scaleSmallerHandler();
}

export {scaleImageHandler};
