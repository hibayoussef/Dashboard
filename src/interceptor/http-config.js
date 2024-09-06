import axios from "axios";

// const { REACT_APP_API_URL } = process.env;

export const _axios = axios.create({
  baseURL: "https://www.api.simatexfairs.com/api/admin",
  // baseURL: "https://www.testapi.simatexfairs.com/api/admin",
});
// _axios.defaults.headers.common["Timezone "] = `${
//   Intl.DateTimeFormat().resolvedOptions().timeZone
// }`;
