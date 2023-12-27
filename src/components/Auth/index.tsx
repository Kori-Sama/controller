import userStore from "../../store/users";
import { Navigate } from "react-router-dom";

const AuthLogin = ({ children }: { children: JSX.Element }) => {
  return <>{userStore.isLogin ? children : <Navigate to="/login" />}</>;
};

export default AuthLogin;
