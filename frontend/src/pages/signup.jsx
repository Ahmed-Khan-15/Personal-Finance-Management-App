import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(username);
    console.log(email);
    console.log(password);
  }

  return (
    <>
      <h1>Sign up Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          id="username"
          type="text"
          value={username}
          placeholder="Enter Your Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <button type="submit">Sign up</button>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
