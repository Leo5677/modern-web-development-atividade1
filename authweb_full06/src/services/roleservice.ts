import { Role } from "@/model/Role";
import { authRepository } from "@/respositories/authrepository";
import { authService } from "./authservice";

class RoleService {
  /* VARIÁVEIS */
  private readonly url = "http://localhost:3030/roles";

  /* CRIA UMA PERMISSÃO */
  public async createRole(role: Role) {
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
      body: JSON.stringify(role),
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

  /* ATUALIZA A PERMISSÃO */
  public async updateRole(role: Role) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* SALVA OS DADOS */
    const response = await fetch(`${this.url}/${role.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(role),
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

  /* OBTÉM TODAS AS PERMISSÕES */
  public async getRoles() {
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

  /* OBTÉM UMA ÚNICA PERMISSÃO */
  public async getRole(id: number) {
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

  /* EXCLUI UMA PERMISSÃO */
  public async removeRole(role: Role) {
    /* TOKEN */
    if (!authService.getLoggedUser()) {
      throw new Error("Unauthorized");
    }

    const token = authRepository.getLoggedUser()?.token;

    /* REMOVE A PERMISSÃO */
    const response = await fetch(`${this.url}/${role.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(role),
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

export const roleService = new RoleService();
