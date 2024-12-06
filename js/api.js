async function getData(onSucces, errorMessage) {
  try {
    const response = await fetch(
      'https://32.javascript.htmlacademy.pro/kekstagram/data',
      {
        method: 'GET',
      }
    );
    if (response.ok) {
      const phortosInfo = await response.json();
      onSucces(phortosInfo);
    }
  } catch {
    errorMessage();
  }
}

async function postData(onSucces, errorMessage, formData) {
  try {
    const response = await fetch(
      'https://32.javascrpt.htmlacademy.pro/kekstagram',{
        method: 'POST',
        body: formData,
      }
    );
    if (response.ok) {
      onSucces();
    }
  } catch (e) {
    errorMessage();
  }
}

export { getData, postData };
