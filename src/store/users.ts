import { makeAutoObservable } from "mobx";
import { UserType } from "../types/User";
import socket from "../socket";
export class UserStore {
  isAdmin = false;
  users = new Array<UserType>();
  username = "";

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user: UserType) {
    this.users.push(user);
  }

  deleteUser(user: UserType) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  modifyUser(user: UserType, newUser: UserType) {
    this.users = this.users.map((item) => {
      if (item === user) {
        return newUser;
      } else {
        return item;
      }
    });
  }

  async reqLogin({ username, password }: UserType): Promise<string | null> {
    console.log("username:", username, "    ", "password:", password);
    // socket.emit("login", JSON.stringify({ username, password }));
    let res = "fake token";
    // socket.on("login", (data) => {
    //   res = data;
    // });
    this.authAdmin({ username, password });
    this.setToken({
      username,
      token: res,
    });
    return null;
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
