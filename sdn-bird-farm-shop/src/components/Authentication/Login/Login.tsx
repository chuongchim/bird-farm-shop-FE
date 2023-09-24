import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  useAxios  from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    useAxios({
      url: "http://localhost:3000/login",
      method: "POST",
      data,
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("accessToken", res.data.token);

          navigate("/");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error: " + err);
      });
  };

  return (
    <div className="container">
      <h1>Đăng nhập</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;