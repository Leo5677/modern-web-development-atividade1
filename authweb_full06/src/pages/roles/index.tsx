import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Role } from "@/model/Role";
import { roleService } from "@/services/roleservice";
import { authService } from "@/services/authservice";
import Input from "../../components/input";
import styles from "./styles.module.css";

/* COMPONENTE */
export default function RolePage() {
  /* VARIÁVEIS */
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* CADASTRA A PERMISSÃO */
  const registerRole = async () => {
    /* VARIÁVEIS */
    let emptyField = 0;

    Array.from(document.getElementsByTagName("input")).forEach((input) => {
      /* VERIFICA CAMPOS VAZIOS */
      if (input.value.length === 0) {
        emptyField++;
      }
    });

    /* RETORNO */
    if (emptyField === 0) {
      try {
        await roleService.createRole({ name, description });

        alert("Role Created Successfully!");
        rota.back();
      } catch (error: any) {
        const user = authService.getLoggedUser();

        if (!user) {
          rota.replace("login");
        }
      }
    } else {
      alert("Fill in all the data!");
    }
  };

  /* ATUALIZA PERMISSÃO */
  const updateRole = async () => {
    try {
      await roleService.updateRole({ id, name, description });

      alert("Role Updated!");
      rota.push("home");
    } catch (error: any) {
      if (authService.isUnauthorized(error)) {
        rota.replace("login");
      }
    }
  };

  /* BUSCA PERMISSÃO */
  const roleID = parseInt(rota.query.id as string, 10);
  const getRole = async (id: number) => {
    try {
      const role = await roleService.getRole(id);

      /* PREENCHE OS CAMPOS */
      setId(role.id);
      setName(role.name);
      setDescription(role.description);
    } catch (error: any) {
      const user = authService.getLoggedUser();

      if (!user) {
        rota.replace("login");
      }
    }
  };

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

  React.useEffect(() => {
    if (roleID) {
      getRole(roleID);
    }
  }, [roleID]);

  /* VERIFICA SE O USUÁRIO ESTÁ LOGADO */
  React.useEffect(() => {
    const user = authService.getLoggedUser();

    if (!user) {
      rota.replace("login");
    }

    fetchRoles();
  }, []);

  /* ESTRUTURA */
  return (
    <>
      <Head>
        <title>Role</title>
        <meta name="description" content="Modern Web Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {roleID ? (
          <h2 className={styles.title}>Role - Update</h2>
        ) : (
          <h2 className={styles.title}>Role - Register</h2>
        )}

        <div className={styles.inputs}>
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            label="Description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          {roleID ? (
            <button type="button" onClick={updateRole}>
              Update
            </button>
          ) : (
            <button type="button" onClick={registerRole}>
              Register
            </button>
          )}
        </div>
      </main>
    </>
  );
}
