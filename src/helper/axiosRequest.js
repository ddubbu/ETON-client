// import axios from 'axios';

// axios.defaults.withCredentials=true;
// axios.defaults.baseURL = 'https://geteton.ga';

// export default async function(subURL='?', accessToken, method, queryString, payload){

//   // queryString은 object로 줘서 
//   // `?key=value&... 연속으로 여기서 작업할 수 있도록
//   console.log(accessToken, '\n', method,'\n', queryString, '\n', payload)
//   if(queryString !== null){
//     subURL += '?'
//     for(let key in queryString){
//       subURL += `${key}=${queryString[key]}&`;
//     }
//   }

//   console.log("==================================")
//   const response = await axios({
//     method,
//     url
//   })
  
  
//   // [method](subURL, 
//   //   payload === undefined ? 
//   //   undefined : {
//   //   ...payload // POST, PUT 만 payload 전달하니깐
//   // })
//   .then(res=>{
//     return res.data;
//   })

//   console.log('resData', response);
//   console.log("==================================")

// }