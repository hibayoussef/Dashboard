import { Route, Routes } from "react-router-dom";
import RoleComponent from "./RoleComponent";
import RoleCreate from "./pages/RoleCreate";
import RoleIndex from "./pages/RoleIndex";

const RoleRouting = () => {
  return (
    <Routes>
      <Route element={<RoleComponent />}>
        <Route path="/" element={<RoleIndex />} />
        <Route path="/create" element={<RoleCreate />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default RoleRouting;
