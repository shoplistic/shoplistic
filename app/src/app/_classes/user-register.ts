export class UserRegister {

  constructor(public username: string, public password: string, public password_repeat: string) {

  }

}

export interface UserRegisterResponse {
  message: string;
}
