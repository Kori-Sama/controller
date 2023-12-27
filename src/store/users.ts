import { action, makeAutoObservable } from "mobx";
import { UserType } from "../types/User";
export class UserStore {
  isLogin = false;
  isAdmin = false;
  users = [] as UserType[];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  addUser(user: UserType) {
    this.users.push(user);
  }

  @action
  deleteUser(user: UserType) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  @action
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
    console.log(username, password);
    this.authAdmin({ username, password });

    this.setLogin(true);
    return null;
  }
  private authAdmin({ username, password }: UserType) {
    if (username === "admin" && password === "123") {
      this.setAdmin(true);
    }
  }
  @action
  private setLogin(value: boolean) {
    this.isLogin = value;
  }
  @action
  private setAdmin(value: boolean) {
    this.isAdmin = value;
  }
}

export default new UserStore();
