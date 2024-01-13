import { makeAutoObservable } from "mobx"
import { UserType } from "../types/User"
import socket from "../socket"
import KEYS from "../types/SocketAPI"

interface LoginType {
  login_result: string
  login_token: string
}

export class UserStore {
  isAdmin = false
  users = new Array<UserType>()
  token = ""
  username = ""
  password = ""

  constructor() {
    makeAutoObservable(this)
    this.loadToken()
    // socket.emit(KEYS.EVENT_UPDATE_CONTROLLER_DATA,JSON.stringify({ username:this.username, password:this.password, token: this.token }))
    if (this.username !== "" && this.password !== "") {
      this.reqLogin({ username: this.username, password: this.password })
    }
  }

  addUser(user: UserType) {
    this.users.push(user)
  }

  deleteUser(user: UserType) {
    const index = this.users.indexOf(user)
    if (index !== -1) {
      this.users.splice(index, 1)
    }
  }

  modifyUser(user: UserType, newUser: UserType) {
    this.users = this.users.map((item) => (item === user ? newUser : item))
  }

  async reqLogin({ username, password }: UserType) {
    return new Promise(async (resolve) => {
      let res: LoginType = await new Promise((resolve) => {
        socket.emit(
          KEYS.EVENT_LOGIN,
          JSON.stringify({ username, password, token: this.token })
        )
        socket.once(KEYS.EVENT_LOGIN, (data: any) => {
          console.log(data)
          data = JSON.parse(data)
          resolve(data)
        })
      })

      if (res.login_result === "already_login") {
        alert("已经登录了")
      }

      if (res.login_result === KEYS.VALUE_LOGIN_RESULT_SUCCESS) {
        this.username = username
        // console.log(res.login_token);
        this.authAdmin({ username, password })
        this.setToken({
          username,
          password,
          token: res.login_token,
        })

        socket.emit(
          KEYS.EVENT_UPDATE_CONTROLLER_DATA,
          JSON.stringify({ username, password, token: this.token })
        )
      }

      resolve(null)
    })
  }

  private authAdmin({ username }: UserType) {
    if (username === "admin") {
      this.setAdmin(true)
    }
  }

  private setAdmin(value: boolean) {
    this.isAdmin = value
  }

  private setToken(token: {
    username: string
    password: string
    token: string
  }) {
    sessionStorage["token"] = JSON.stringify(token)
  }

  loadToken(): boolean {
    const data = sessionStorage.getItem("token")

    if (data === null) return false

    const { username, password, token } = JSON.parse(data)
    this.username = username
    this.password = password
    this.token = token
    if (username === "admin") {
      this.setAdmin(true)
    } else {
      this.setAdmin(false)
    }
    if (token === "") return false
    return true
  }
}

export default new UserStore()
