
import { useAppSelector } from "../../redux/hooks";

function Profile(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  


  return (
   <></>
  );
}

export default Profile;