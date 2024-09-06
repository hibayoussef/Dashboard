import { Route, Routes } from "react-router-dom";
import {
  RoleRouting, 
  NotificationRouting
} from "routes/route";
import DashboardComponent from "./DashboardComponent";
import DashboardIndex from "./pages/DashboardIndex";

const DashboardRouting = () => {
  return (
    <Routes>
      {
        <Route element={<DashboardComponent />}>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/roles/*" element={<RoleRouting />} />
           <Route path="/notifications/*" element={<NotificationRouting />} />
        </Route>
      }

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default DashboardRouting;
