import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authservice";
import Input from "../../components/input";
import styles from "./styles.module.css";
import FooterPage from "../footer";

export default function LoginPage() {
  /* VARIÁVEIS */
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* REALIZAR O LOGIN */
  const signIn = async () => {
    const isLogged = await authService.login(login, password);

    if (isLogged) {
      rota.replace("home");
    } else {
      alert("Invalid username and/or password.");
    }
  };

  /* ESTRUTURA */
  return (
    <div className={styles.loginPage}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Modern Web Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.loginMain}>
        <h2>Modern Web Development</h2>

        <Input
          label="Login"
          type="text"
          onChange={(event) => setLogin(event.target.value)}
        />

        <Input
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="button" className={styles.loginButton} onClick={signIn}>
          Sign In
        </button>
      </main>

      <FooterPage />
    </div>
  );
}
