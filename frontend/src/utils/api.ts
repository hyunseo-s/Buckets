// export const createRequest = async (url, requestType, body) => {
//   const options = {
//     method: requestType,
//     headers : {
//         'Content-type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//     },
//   }
//   if (body !== undefined) {
//       options.body = JSON.stringify(body);
//   }
//   return fetch(`http://localhost:${config.BACKEND_PORT}${url}`, options)
//   .then((response) => response.json())
//   .then((json) => {
//     if ("error" in json) {
//       return Promise.reject(json.error);
//     }
//     return json;
//   })
//   .catch((err) => Promise.reject(err))
// }

// export const get = (url, body) =>
//   createRequest(url, "GET", body);

// export const post = (url, body) =>
//   createRequest(url, "POST", body);

// export const put = (url, body) =>
//   createRequest(url, "PUT", body);

// export const del = (url, body) =>
//   createRequest(url, "DELETE", body);