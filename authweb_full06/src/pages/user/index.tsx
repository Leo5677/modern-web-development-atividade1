import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Role } from "@/model/Role";
import { userService } from "@/services/userservice";
import { roleService } from "@/services/roleservice";
import { authService } from "@/services/authservice";
import Input from "../../components/input";
import styles from "./styles.module.css";

/* COMPONENTE */
export default function UserPage() {
  /* VARIÁVEIS */
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [rolesSelected, setRolesSelected] = React.useState<string[]>([]);

  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* LISTA DE PERMISSÕES */
  const [roles, setRoles] = React.useState<Role[]>([]);

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

  /* VERIFICA SE O USUÁRIO ESTÁ LOGADO */
  React.useEffect(() => {
    const user = authService.getLoggedUser();

    if (!user) {
      rota.replace("login");
    }

    /* CARREGA AS ROLES */
    fetchRoles();
  }, []);

  const handleCheckRole = (roleName: any) => {
    if (rolesSelected) {
      if (rolesSelected.includes(roleName)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /* BUSCA USUÁRIO */
  const userID = parseInt(rota.query.id as string, 10);
  const getUser = async (id: number) => {
    try {
      const user = await userService.getUser(id);

      /* PREENCHE OS CAMPOS */
      setId(user.id);
      setName(user.name);
      setUsername(user.username);
      setRolesSelected(user.roles);
    } catch (error: any) {
      const user = authService.getLoggedUser();

      if (!user) {
        rota.replace("login");
      }
    }
  };

  React.useEffect(() => {
    if (userID) {
      getUser(userID);
    }
  }, [userID]);

  /* VERIFICA TODAS AS PERMISSÕES SELECIONADAS */
  const handleSelectedRole = (event: any) => {
    if (event.target.checked) {
      if (rolesSelected) {
        setRolesSelected((roleList) => [
          ...roleList,
          event.target.previousElementSibling?.textContent,
        ]);
      } else {
        setRolesSelected([...event.target.previousElementSibling?.textContent]);
      }
    } else {
      setRolesSelected((roleList) =>
        roleList.filter(
          (role) => role !== event.target.previousElementSibling?.textContent
        )
      );
    }
  };

  /* CADASTRAR USUÁRIO */
  const registerUser = async () => {
    /* VARIÁVEIS */
    let emptyField = 0;
    let emptyRole = 0;
    let equallityPasswords = 0;

    /* VERIFICA O PREENCHIMENTO DOS CAMPOS */
    Array.from(document.getElementsByTagName("input")).forEach((input) => {
      /* VERIFICA CAMPOS VAZIOS */
      if (input.value.length === 0) {
        emptyField++;
      }

      /* VERIFICA IGUALDADE DE SENHAS */
      if (
        input.previousElementSibling?.textContent === "Senha:" ||
        input.previousElementSibling?.textContent === "Confirmar Senha:"
      ) {
        if (password !== passwordConfirm) {
          equallityPasswords++;
        }
      }
    });

    /* VERIFICA ESCOLHAS DE PERMISSÕES */
    if (rolesSelected.length === 0) {
      emptyRole++;
    }

    /* RETORNO */
    if (emptyField === 0 && equallityPasswords === 0 && emptyRole === 0) {
      try {
        await userService.createUser({
          name: name,
          username: username,
          roles: rolesSelected,
          password: password,
        });

        alert("User Created Successfully!");
        rota.back();
      } catch (error: any) {
        const user = authService.getLoggedUser();

        if (!user) {
          rota.replace("login");
        }
      }
    } else {
      alert("Fill in all the data and passwords must be identical!");
    }
  };

  /* ATUALIZA USUÁRIO */
  const updateUser = async () => {
    try {
      await userService.updateUser({
        id: id,
        name: name,
        username: username,
        roles: rolesSelected,
        password: password,
      });

      alert("User Updated!");
      rota.push("home");
    } catch (error: any) {
      if (authService.isUnauthorized(error)) {
        rota.replace("login");
      }
    }
  };

  /* ESTRUTURA */
  return (
    <>
      <Head>
        <title>User</title>
        <meta name="description" content="Modern Web Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {userID ? (
          <h2 className={styles.title}>User - Update</h2>
        ) : (
          <h2 className={styles.title}>User - Register</h2>
        )}

        <div className={styles.inputs}>
          <Input
            label="Name:"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            label="Username:"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <Input
            label="Password:"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Input
            label="Confirm Password:"
            type="password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />

          {roles?.map((role) => (
            <Input
              label={role.name}
              type="checkbox"
              key={role.id}
              onChange={handleSelectedRole}
              checked={handleCheckRole(role.name)}
            />
          ))}

          {userID ? (
            <button type="button" onClick={updateUser}>
              Update
            </button>
          ) : (
            <button type="button" onClick={registerUser}>
              Register
            </button>
          )}
        </div>
      </main>
    </>
  );
}
