import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Save name to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 underline">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
