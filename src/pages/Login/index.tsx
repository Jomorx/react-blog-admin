import { LoginApi } from "@/api/LoginApi";
import { getToken, setToken } from "@/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function index(props: any) {
  const Login = async () => {
    const { data } = await LoginApi(account, password);
    if (data.token) {
      setToken(data.token);
      navigate("/", { replace: true });
    }
  };
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    getToken() && navigate("/");
  }, []);
  return (
    <div>
      账号:
      <input
        type="text"
        value={account}
        onChange={(e) => {
          setAccount(e.target.value);
        }}
      />
      <br />
      密码:
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={Login}>登录</button>
    </div>
  );
}

export default index;
