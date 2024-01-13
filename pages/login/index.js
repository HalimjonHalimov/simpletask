import { Input, Layout } from "@/component";
import React, { useEffect, useState } from "react";
import { Divider, Chip } from "@mui/material";
import AuthService from "@/service/authService";
import { useAuthContext } from "@/context/contextProvider";
import { useRouter } from "next/router";
import { setItems } from "@/helper/localstorage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser, setToken, setLoggedIn, loggedIn } = useAuthContext();
  const router = useRouter();

  const submithandle = async (e) => {
    try {
      e.preventDefault();
      const userInfo = { username, password };
      const response = await AuthService.getAuth(userInfo);
      setCurrentUser(response);
      setToken(response.token);
      setItems('token', response.token)
      setLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {loggedIn ? (
        <div className="w-full max-w-xs mx-auto my-[4rem]">
          You already logged in Please redirect to main page
        </div>
      ) : (
        <div className="w-full max-w-xs mx-auto my-[4rem]">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Input
              type="text"
              label="Username"
              state={username}
              setState={setUsername}
            />
            <Input
              type="password"
              label="Password"
              state={password}
              setState={setPassword}
            />
            <Divider>
              <Chip label="or" size="small" />
            </Divider>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submithandle}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;{new Date().getFullYear()} Acme Corp. All rights reserved.
          </p>
        </div>
      )}
    </Layout>
  );
}
