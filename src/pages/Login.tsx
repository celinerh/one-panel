import { Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";

function Login() {
  return (
    <div>
      <h1 className="relative mx-auto my-32 text-6xl w-fit font-Pacifico">
        OnePanel
        <span className="absolute h-10 bg-green-300 -bottom-5 w-52 -left-2 -z-10"></span>
      </h1>
      <div className="flex flex-col items-center max-w-sm gap-6 p-10 mx-auto bg-white">
        <h2 className="font-medium">Login</h2>
        <div className="w-8 h-2 bg-green-400 rounded-sm"></div>
        <TextInput
          placeholder="Username"
          label="Username"
          withAsterisk
          className="w-full"
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          className="w-full"
        />
        <Button color="primary" className="bg-green-400">
          Log in
        </Button>
      </div>
    </div>
  );
}

export default Login;
