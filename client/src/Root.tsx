// import NavBar from './components/ui/NavBar'
import { Outlet } from "react-router-dom";
import Navbar from "./widgets/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}
