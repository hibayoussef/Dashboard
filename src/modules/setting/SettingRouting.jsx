import { Route, Routes } from "react-router-dom";
import SettingComponent from "./SettingComponent";
import SettingIndex from "./pages/SettingIndex";

const SettingRouting = () => {
  return (
    <Routes>
      <Route element={<SettingComponent />}>
        <Route path="/" element={<SettingIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default SettingRouting;
