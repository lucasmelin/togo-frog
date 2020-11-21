import React, { useState } from "react";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") return;
    props.onFormSubmit({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            Togo Login
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="What's your email?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="What's your password?"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-700 hover:bg-purple-800 focus:bg-purple-900"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
