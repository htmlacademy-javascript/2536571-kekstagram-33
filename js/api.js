const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route,errorMessage,method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (response.ok) {
      return await response.json();
    }
  } catch(e){
    errorMessage();
  }
};

const getData = async (errorMessage) => await load(ROUTE.GET_DATA,errorMessage);

const postData = async (onSuccess,errorMessage,body) => await load(ROUTE.SEND_DATA,onSuccess,errorMessage,Method.POST,body);

export { getData, postData };
