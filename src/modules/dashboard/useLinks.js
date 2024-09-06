import LockIcon from "@mui/icons-material/Lock";
import { usePermissions } from "hooks/usePermissions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const useLinks = () => {
  const { t } = useTranslation("sidebar");
  const { permissions } = usePermissions();
  const location = useLocation();

  const links = useMemo(() => {
    const dynamicLinks = [];
    const staticLinks = [];

    const allLinks = [
      {
        name: "Role",
        link: "/dashboard/roles",
        icon: <LockIcon />,
      },
    ];

    for (const link of allLinks) {
      const moduleName = link.name.replace(/_/g, " ");
      const displayName = moduleName.endsWith("s")
        ? moduleName
        : `${moduleName}s`;

      if (permissions[moduleName.replace(/ /g, "_")]?.All === true) {
        dynamicLinks.push({
          name: t(displayName),
          link: link.link,
          icon: link.icon,
          list: link.list,
        });
      }
    }

    return [...dynamicLinks, ...staticLinks];
  }, [t, permissions, location.pathname]);

  return {
    links,
  };
};