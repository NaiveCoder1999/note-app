import axios from 'axios';
import * as Constants from '../constants/config';
export default function myAxios(axiosConfig) {
  const instance = axios.create({
    baseURL: Constants.COURSE_API_URL, // 设置统一的请求前缀
    headers: { 'Content-Type': 'application/json' },
  });

  return instance(axiosConfig);
}
