import { makeAutoObservable } from "mobx";
import { UserType } from "../types/User";
import { reqRegister } from "../http";

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  async register(user: UserType): Promise<string | null> {
    const { username, password } = user;

    const msg = this.authInput(username, password);
    if (!msg) return msg;

    const res = await reqRegister(user);
    const result = res?.data;
    // !TODO
    return null;
  }

  private authInput(username: string, password: string): string | null {
    if (!username) {
      return "用户名不能为空";
    }
    if (!password) {
      return "密码不能为空";
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8, }$/;
    if (!regex.test(password)) {
      return "密码至少八个字符，至少一个字母和一个数字";
    }
    return null;
  }
}

export default new UserStore();
