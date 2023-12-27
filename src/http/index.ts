import axios from "axios";
import { UserType } from "../types/User";

export default function ajax(url = "", data: any = {}, type = "GET") {
  url = "/api" + url
  if (type === "GET") {
    let queryStr = "";
    for (let key in data) {
      queryStr += `${key}=${data[key]}&`;
    }
    if (queryStr !== "") {
      queryStr = queryStr.slice(0, -1);
      return axios.get(`${url}?${queryStr}`);
    }
  } else {
    return axios.post(url, data);
  }
}

export const reqRegister = (user: UserType) => ajax("/register", user, "POST");

export const reqLogin = (user: UserType) => ajax("/login", user, "POST");

export const reqUpdate = (user: UserType) => ajax("/update", user, "POST");
