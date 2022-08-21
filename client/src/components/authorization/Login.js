import React, { useState } from "react";
import "./authorization.css";
import Input from "../utils/Input";
import { login } from "../../actions/user";
import { useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="authorization">
      <div className="authorization__header">Log in</div>
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
        onClick={() => dispatch(login(email, password))}
      >
        Log in
      </button>
    </div>
  );
}

export default Login;
