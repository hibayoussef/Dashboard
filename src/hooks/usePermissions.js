import { usePermissionsAll } from "services/permission/usePermissionsAll";

export const usePermissions = () => {
  const { data } = usePermissionsAll();
  const permissions = {};

  if (data && data.data) {
    for (const [module, perms] of Object.entries(data.data)) {
      permissions[module] = {
        All: perms.All,
        Change_Status: perms.Change_Status,
        Create: perms.Create,
        Delete: perms.Delete,
        Details: perms.Details,
        Export: perms.Export,
        List: perms.List,
        Update: perms.Update,
      };
    }
  }
  return { data, permissions };
};
