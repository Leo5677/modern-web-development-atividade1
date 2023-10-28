import React from "react";
import { Role } from "@/model/Role";
import { roleService } from "@/services/roleservice";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

/* PROPS */
type Props = { roles: Role[] };

export default function RoleList({ roles }: Props) {
  /* NAVEGAÇÃO */
  const rota = useRouter();

  /* EDITA A PERMISSÃO */
  const editRole = async (role: Role) => {
    rota.push(`roles?id=${role.id}`);
  };

  /* REMOVE A PERMISSÃO */
  const removeRole = async (role: Role) => {
    if (confirm("Remove Role?")) {
      try {
        await roleService.removeRole(role);

        alert("Role Removed!");
        location.reload();
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      return false;
    }
  };

  return (
    <div className={styles.roleListContainer}>
      {roles?.map((role) => (
        <div className={styles.roleListItem} key={role.id}>
          <div>
            <span>{role.name}</span>
            <span>{role.description}</span>
          </div>

          <div>
            <button type="button" onClick={() => editRole(role)}>
              Edit
            </button>
            <button type="button" onClick={() => removeRole(role)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
