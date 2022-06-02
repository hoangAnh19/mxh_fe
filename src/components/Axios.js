const axios = require("axios");
const apiURL = "http://127.0.0.1:8000/api/";
var header = {};
var token;
// var tokenMxh
export default {
  get(url) {
    token = localStorage.getItem("token");
    if (token !== null) header = { Authorization: "Bearer " + token };
    return axios.get(apiURL + url, {
      headers: header,
    });
  },
  delete(url) {
    token = localStorage.getItem("token");
    if (token !== null) header = { Authorization: "Bearer " + token };
    return axios.delete(apiURL + url, {
      headers: header,
    });
  },
  post(url, data) {
    token = localStorage.getItem("token");
    if (token !== null) header = { Authorization: "Bearer " + token };
    return axios.post(apiURL + url, data, {
      headers: header,
    });
  },
  put(url, data) {
    token = localStorage.getItem("token");
    if (token !== null) header = { Authorization: "Bearer " + token };
    return axios.put(apiURL + url, data, {
      headers: header,
    });
  },
};
