import { authRepository } from "@/respositories/authrepository";

class AuthService {
  /* VARIÁVEIS */
  private readonly url = "http://localhost:3030/auth/login";

  /* VERIFICA ERRO */
  public isUnauthorized(error: any) {
    return (error.message === "Invalid Token");
  }

  /* FUNÇÃO REPASSE USUÁRIO LOGADO */
  public getLoggedUser() {
    return authRepository.getLoggedUser();
  } 

  /* FUNÇÃO REPASSE USUÁRIO DESLOGADO */
  public logOff() {
    authRepository.removeLoggedUser();
  }

  /* REALIZA O LOGIN DO USUÁRIO */
  public async login(username: string, password: string) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.status == 201) {
      response.json().then((logged) => {
        /* SALVA NO LOCAL STORAGE O USUÁRIO LOGADO */
        authRepository.setLoggedUser(logged);
      });
      return true;
    } else {
      return false;
    }
  }
}

export const authService = new AuthService();
