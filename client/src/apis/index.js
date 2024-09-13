import httpAxios from "../utils/httpAxios";

async function logOutApi() {
  localStorage.removeItem("user");
  return await httpAxios.delete(`/user/logout`);
} 

async function refreshTokenApi() {
  return await httpAxios.put(`/user/refresh_token`);
} 


export {logOutApi, refreshTokenApi}