import loadable from "@loadable/component";
import React from "react";

// ============ Auth ============
export const ResetPassword = React.lazy(() => import("pages/ResetPassword"));
export const PasswordEditForm = React.lazy(() =>
  import("pages/PasswordEditForm")
);
export const VerificationCodeForm = React.lazy(() =>
  import("pages/VerificationCodeForm")
);

export const ContactRouting = loadable(() =>
  import("modules/contact-information/ContactRouting")
);
export const RoleRouting = loadable(() =>
  import("modules/role-permission/RoleRouting")
);

// ============ DashboardRouting ============
export const DashboardRouting = React.lazy(() =>
  import("../modules/dashboard/DashboardRouting")
);
// ============ DashboardRouting ============
export const NotificationRouting = loadable(() =>
  import("modules/notification/NotificationRouting")
);