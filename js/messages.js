import { resetFile, isEscapeKey } from "./utils";
import { resetForm } from "./validate-text-image";
import { resetScalingSettings } from "./photo-scaling";
import { resetFilterSettings } from "./photo-filtering";
import {
  removeEscKeydownHandler,
  addEscKeydownHandler,
} from "./upload-new-photo";

const errorMessageElement = document
  .querySelector("#data-error")
  .content.querySelector(".data-error");
const succesMessageElement = document
  .querySelector("#success")
  .content.querySelector(".success");

const errorPostMessageElement = document
  .querySelector("#error")
  .content.querySelector(".error");

const succesMessageButtonElement = document.querySelector(".success__button");

const errorMessageGet = () => {
  let newErrorMessage = errorMessageElement.cloneNode(true);
  document.body.append(newErrorMessage);
  setTimeout(() => newErrorMessage.remove(), 5000);
};

const succesMessagePost = () => {
  const succesMessage = succesMessageElement.cloneNode(true);
  document.body.append(succesMessage);
  succesMessageHandler(succesMessage);
};

const closeSuccesMessage = (succesMessage) => {
  document.removeEventListener("keydown", onEscKeydownSucces);
  succesMessage.remove();
  addEscKeydownHandler();
};

const onEscKeydownSucces = (e) => {
  let succesMessage = document.querySelector(".success");
  console.log(succesMessage);
  if (isEscapeKey(e)) {
    closeSuccesMessage(succesMessage);
  }
};

const succesMessageHandler = (succesMessage) => {
  succesMessage
    .querySelector(".success__button")
    .addEventListener("click", () => closeSuccesMessage(succesMessage));
  succesMessage.addEventListener("click", (e) => {
    if (e.target.className !== "success__inner") {
      closeSuccesMessage(succesMessage);
    }
  });
  document.addEventListener("keydown", onEscKeydownSucces);
  removeEscKeydownHandler();
};

const errorMessagePost = () => {
  const errorMessage = errorPostMessageElement.cloneNode(true);
  document.body.append(errorMessage);
  errorMessageHandler(errorMessage);
};

const errorMessageHandler = (errorMessage) => {
  errorMessage
    .querySelector(".error__button")
    .addEventListener("click", () => closeErrorMessage(errorMessage));
  errorMessage.addEventListener("click", (e) => {
    if (e.target.className !== "error__inner") {
      closeErrorMessage(errorMessage);
    }
  });
  document.addEventListener("keydown", onEscKeydownError);
  removeEscKeydownHandler();
};

const onEscKeydownError = (e) => {
  let errorMessage = document.querySelector(".error");
  console.log(errorMessage);
  if (isEscapeKey(e)) {
    closeSuccesMessage(errorMessage);
  }
};

const closeErrorMessage = (error) => {
  error.remove();
  addEscKeydownHandler();
  document.removeEventListener('keydown',onEscKeydownError)
};

const resetFormData = () => {
  resetForm();
  resetFile();
  resetScalingSettings();
  resetFilterSettings();
};

const addSuccesMessage = () => {
  resetFormData();
  succesMessagePost();
};

const addErrorMessage = () => {errorMessagePost()};

export { addSuccesMessage,addErrorMessage, errorMessageGet,resetFormData };
