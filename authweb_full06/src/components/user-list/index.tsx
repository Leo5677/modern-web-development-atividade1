import React from "react";
import { User } from "@/model/User";
import { userService } from "@/services/userservice";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

/* PROPS */
type Props = { users: User[] };

export default function UserList({ users }: Props) {
  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* EDITA O USUÁRIO */
  const editUser = async (user: User) => {
    rota.push(`user?id=${user.id}`);
  };

  /* REMOVE O USUÁRIO */
  const removeUser = async (user: User) => {
    if (confirm("Remove User?")) {
      try {
        await userService.removeUser(user);

        alert("User Removed!");
        location.reload();
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      return false;
    }
  };

  /* ESTRUTURA */
  return (
    <div className={styles.userListContainer}>
      {users?.map((user) => (
        <div className={styles.userListItem} key={user.id}>
          <div>
            <span>{user.name}</span>
            <span>{user.username}</span>
          </div>

          <div>
            <button type="button" onClick={() => editUser(user)}>
              Edit
            </button>
            <button type="button" onClick={() => removeUser(user)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
