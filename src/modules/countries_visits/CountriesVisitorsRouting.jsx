import { Route, Routes } from "react-router-dom";
import CountriesVisitorIndex from "./pages/CountriesVisitorIndex";

const CountriesVisitorComponent = () => {
  return (
    <Routes>
      <Route element={<CountriesVisitorComponent />}>
        <Route path="/" element={<CountriesVisitorIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CountriesVisitorComponent;
