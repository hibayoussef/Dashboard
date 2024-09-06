import { Route, Routes } from "react-router-dom";
import NotificationComponent from "./NotificationComponent";
import NotificationCreate from "./pages/NotificationCreate";

const NotificationRouting = () => {
  return (
    <Routes>
      <Route element={<NotificationComponent />}>
        <Route path="/" element={<NotificationCreate />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default NotificationRouting;
