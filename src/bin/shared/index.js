import cookie from 'react-cookies';
import axios from 'axios';
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const ROOT_URL = process.env.REACT_APP_API_URL || "http://localhost:1337";

function axiosPost(url,data = {}){
  return axios({
    url: url,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function upload(files){
  var url = `${ROOT_URL}/upload`;
  return axiosPost(url,files);
}
