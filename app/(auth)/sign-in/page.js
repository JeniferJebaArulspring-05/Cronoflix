"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError(
        "⚠ Please enter a valid Gmail address (e.g., example@gmail.com)."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError("⚠ Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("✅ SignIn successful! Redirecting...", {
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);

      setLoading(false); // Redirect to home after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="w-md sm:w-sm h-[70%] p-10 rounded-lg
      backdrop-blur-[30px] backdrop-saturate-[100%]  bg-opacity-10 
       border-opacity-20  bg-black"
    >
      <h1 className="text-center pb-10 text-3xl font-semibold">Sign In</h1>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 lg:gap-10 mt-5"
      >
        <input
          type="email"
          placeholder="Enter your Gmail"
          onChange={(e) => setEmail(e.target.value)}
          className="border  ring-2 focus:ring-blue-400 hover: p-4 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password "
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 border  rounded ring-2 focus:ring-blue-400  ring-offset-4w-full"
          minLength={8}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {loading ? "Verify Your Account..." : "sign-in"}
        </button>
      </form>

      <p className="text-center pt-5">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-blue-500 underline">
          Sign Up
        </a>
      </p>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

{
  /* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-blue-500 underline">
          Sign Up
        </a>
      </p>
      
    </div> */
}
