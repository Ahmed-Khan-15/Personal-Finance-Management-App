import { Link } from "react-router-dom";
import { useState } from "react";
import login from "../services/authServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try{

      const data = await login({ email, password });
      console.log(data);
      localStorage.setItem("token",data.token)
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
