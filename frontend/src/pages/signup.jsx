import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../services/authServices";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    console.log("Submit clicked");
    event.preventDefault();
    try{
          const data = await signup({ username, email, password });
          console.log(data.message)
          navigate("/login");
    }
    catch(error){
          console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-8"><h1 className="text-2xl font-bold tracking-tight text-slate-800">Sign up Page</h1></div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2"><label className="text-sm font-medium text-slate-700" htmlFor="username">Username</label>
        <input
          required
          id="username"
          type="text"
          value={username}
          placeholder="Enter Your Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
        />
        </div><div className="space-y-2"><label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
        />
        </div><div className="space-y-2"><label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
        />
        </div><button className="w-full rounded-xl bg-[#318097] px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#225969]" type="submit">Sign up</button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?
          <Link className="ml-1 font-medium text-[#318097] hover:text-[#225969]" to="/login">Login</Link>
        </p>
      </form></div>
    </div>
  );
}

export default Signup;
