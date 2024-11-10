// src/pages/login.js
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mock API call
    const mockResponse = {
      token: "mock-jwt-token",
      user: { name: "John Doe", email },
    };

    // Set token in cookie
    Cookies.set("token", mockResponse.token, { expires: 7 });
    dispatch(login(mockResponse));
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
