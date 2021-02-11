import axios from 'axios';

axios.defaults.withCredentials=true;
axios.defaults.baseURL = 'https://geteton.ga';
// axios.defaults.baseURL = 'http://localhost:4000';

export default async function(subURL='', accessToken, method, queryString, payload){

  console.log(`subURL>>${subURL}`);
  console.log(`accessToken>>${accessToken}`);
  console.log(`method>> ${method}`);
  console.log(`queryString>> ${queryString}`);
  console.log(`payload>> ${payload}`);
  console.log("==================================")
  const response = await axios({
    method,
    url: subURL,
    params: queryString,
    data: payload,
    headers:{
      authorization: `bearer ${accessToken}`
    }
  })
  .then(res=>{
    return res.data;
  })
  .catch(e=>{
    //!403 status code 이면 만료되었다고 다시 로그인창으로 이동
    console.log("ERROR", e)
  })

  console.log('resData', response);
  console.log("==================================")
  return response;
}