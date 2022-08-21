import React, { useState } from "react";
import "./authorization.css";
import Input from "../utils/Input";
import { registration } from "../../actions/user";
export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authorization">
      <div className="authorization__header">Sign up</div>
      <Input
        value={email}
        type="email"
        setValue={setEmail}
        placeholder="Enter email"
      />
      <Input
        value={password}
        type="password"
        setValue={setPassword}
        placeholder="Enter password"
      />

      <button
        className="authorization__btn"
        onClick={() => registration(email, password)}
      >
        Sign up
      </button>
    </div>
  );
}
