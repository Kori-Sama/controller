import { makeAutoObservable } from "mobx";
import { UserType } from "../types/User";
import socket from "../socket";
import KEYS from "../types/SocketAPI";

interface LoginType {
  login_result: string;
  login_token: string;
}

export class UserStore {
  isAdmin = false;
  users = new Array<UserType>();
  token = "";
  username = "";

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  addUser(user: UserType) {
    this.users.push(user);
  }

  deleteUser(user: UserType) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  modifyUser(user: UserType, newUser: UserType) {
    this.users = this.users.map((item) => (item === user ? newUser : item));
  }

  async reqLogin({ username, password }: UserType) {
    return new Promise(async (resolve) => {
      let res: LoginType = await new Promise((resolve) => {
        socket.emit(
          KEYS.EVENT_LOGIN,
          JSON.stringify({ username, password, token: this.token })
        );
        socket.once(KEYS.EVENT_LOGIN, (data: any) => {
          console.log(data)
          resolve(data);
        });
      });

      if (res.login_result === "success") {
        this.username = username;
        // console.log(res.login_token);
        this.authAdmin({ username, password });
        this.setToken({
          username,
          token: res.login_token,
        });
      }

      resolve(null);
    });
  }

  private authAdmin({ username, password }: UserType) {
    if (username === "admin" && password === "123") {
      this.setAdmin(true);
    }
  }

  private setAdmin(value: boolean) {
    this.isAdmin = value;
  }

  private setToken(token: { username: string; token: string }) {
    sessionStorage["token"] = JSON.stringify(token);
  }

  loadToken(): boolean {
    const data = sessionStorage.getItem("token");

    if (data === null) return false;

    const { username, token } = JSON.parse(data);
    this.username = username;
    this.token = token;
    if (username === "admin") {
      this.setAdmin(true);
    } else {
      this.setAdmin(false);
    }
    if (token === "") return false;
    return true;
  }
}

export default new UserStore();
