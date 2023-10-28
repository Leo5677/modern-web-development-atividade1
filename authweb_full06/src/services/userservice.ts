import { User } from "@/model/User";
import { authRepository } from "@/respositories/authrepository";
import { authService } from "./authservice";

class UserService {
  /* VARIÁVEIS */
  private readonly url = "http://localhost:3030/users";

  /* CRIA O USUÁRIO */
  public async createUser(user: User) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* SALVA OS DADOS */
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case 401:
        throw new Error("Invalid Token");

      case 400:
        throw new Error("Already Registered");

      case 201:
        return true;

      default:
        throw new Error("Error ocurred during registration");
    }
  }

  /* ATUALIZA O USUÁRIO */
  public async updateUser(user: User) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* SALVA OS DADOS */
    const response = await fetch(`${this.url}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case 401:
        throw new Error("Invalid Token");
        
      case 200:
        return true;

      default:
        throw new Error("Error ocurred during registration");
    }
  }

  /* OBTÉM TODOS OS USUÁRIOS */
  public async getUsers() {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* OBTÉM OS DADOS */
    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    switch (response.status) {
      case 401:
        throw new Error("Invalid Token");

      case 200:
        return await response.json();

      default:
        throw new Error("Error ocurred during registration");
    }
  }

  /* OBTÉM UM ÚNICO USUÁRIO */
  public async getUser(id: number) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* SALVA OS DADOS */
    const response = await fetch(`${this.url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    switch (response.status) {
      case 401:
        throw new Error("Invalid Token");

      case 200:
        return await response.json();

      default:
        throw new Error("Error ocurred during registration");
    }
  }

  /* EXCLUI UM USUÁRIO */
  public async removeUser(user: User) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* REMOVE O USUÁRIO */
    const response = await fetch(`${this.url}/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case 401:
        throw new Error("Invalid Token");

      case 200:
        return true;

      default:
        throw new Error("Error ocurred during registration");
    }
  }
}

export const userService = new UserService();
