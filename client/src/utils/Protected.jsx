import useToken from "../hooks/useToken";
import { useLocation, Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { token } = useToken();
  const location = useLocation();

  if (!token)
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  return <main className="w-full">{children}</main>;
}
