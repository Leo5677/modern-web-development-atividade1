import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userservice";
import { roleService } from "@/services/roleservice";
import { authService } from "@/services/authservice";
import UserList from "@/components/user-list";
import RoleList from "@/components/role-list";
import styles from "./styles.module.css";
import FooterPage from "../footer";

export default function HomePage() {
  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* LISTA DE USUÁRIOS */
  const [users, setUsers] = React.useState([]);

  function fetchUsers() {
    userService
      .getUsers()
      .then((usuarios) => setUsers(usuarios))
      .catch((error: any) => {
        if (authService.isUnauthorized(error)) {
          rota.replace("login");
        }
      });
  }

  /* LISTA DE PERMISSÕES */
  const [roles, setRoles] = React.useState([]);

  function fetchRoles() {
    roleService
      .getRoles()
      .then((roles) => setRoles(roles))
      .catch((error: any) => {
        if (authService.isUnauthorized(error)) {
          rota.replace("login");
        }
      });
  }

  React.useEffect(() => {
    /* VERIFICA USUÁRIO LOGADO */
    const user = authService.getLoggedUser();

    if (!user) {
      rota.replace("login");
    }

    /* CARREGA USUÁRIOS E PERMISSÕES */
    fetchUsers();
    fetchRoles();
  }, []);

  /* FUNÇÃO PARA OBTER USUÁRIO */
  function goToUser() {
    rota.push("user");
  }

  /* FUNÇÃO PARA ACESSAR A PÁGINA DE REGRAS */
  function goToRoles() {
    rota.push("roles");
  }

  /* DESLOGAR O USUÁRIO */
  function logOff() {
    authService.logOff();
    rota.replace("login");
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Modern Web Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.homeMain}>
        <div className={styles.homeHeader}>
          <div>
            <button onClick={goToUser}>Add User</button>
            <button onClick={goToRoles}>Add Roles</button>
            <button onClick={logOff}>Exit</button>
          </div>
        </div>

        <div className={styles.homeActions}>
          <div className={styles.homeViewUsers}>
            <h2>User List</h2>
            <UserList users={users} />
          </div>

          <div className={styles.homeViewRoles}>
            <h2>Role List</h2>
            <RoleList roles={roles} />
          </div>
        </div>
      </main>

      <FooterPage />
    </>
  );
}
