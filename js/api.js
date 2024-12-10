const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route,errorMessage,onSuccess,method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (response.ok) {
      if(method == 'GET'){
        return onSuccess(await response.json());
      }
      onSuccess();
    } else{
      errorMessage();
    }
  } catch(e){
    errorMessage();
  }
};

const getData = async (onSuccess,errorMessage) => await load(ROUTE.GET_DATA,errorMessage,onSuccess);

const postData = async (onSuccess,errorMessage,body) => await load(ROUTE.SEND_DATA,errorMessage,onSuccess,Method.POST,body);

export { getData, postData };
