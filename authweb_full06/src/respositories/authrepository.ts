import { User } from "@/model/User";

class AuthRepository {
  /* OBTÉM O USUÁRIO LOGADO */
  public getLoggedUser() {
    const json = localStorage.getItem("AULA_AUTH_LOGGED");

    return json ? JSON.parse(json) as User : null;
  }

  /* ARMAZENA O USUÁRIO LOGADO */
  public setLoggedUser(user: User) {
    const json = JSON.stringify(user);

    localStorage.setItem("AULA_AUTH_LOGGED", json);
  }

  /* REMOVE O USUÁRIO LOGADO */
  public removeLoggedUser() {
    localStorage.removeItem("AULA_AUTH_LOGGED");
  }
}

export const authRepository = new AuthRepository();
