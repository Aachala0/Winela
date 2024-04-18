import "./App.css";
import Navbar from "./module/common/Navbar/navbar";
import Footer from "./module/common/Footer/footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
