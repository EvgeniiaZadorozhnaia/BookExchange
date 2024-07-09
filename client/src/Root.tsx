import { Outlet } from "react-router-dom";
import Navbar from "./widgets/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "85px", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <Outlet />
      </div>
    </>
  );
}
