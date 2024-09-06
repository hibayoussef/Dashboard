import { Route, Routes } from "react-router-dom";
import ContactComponent from "./ContactComponent";
import ContactIndex from "./pages/ContactIndex";

const ContactRouting = () => {
  return (
    <Routes>
      <Route element={<ContactComponent />}>
        <Route path="/" element={<ContactIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ContactRouting;
