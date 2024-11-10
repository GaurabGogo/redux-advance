// src/pages/dashboard.js
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
