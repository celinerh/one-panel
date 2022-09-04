import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../contexts/TokenContext";

function Login() {
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .then(() => navigate("/products"));
  };

  return (
    <div>
      <h1 className="relative mx-auto my-32 text-6xl w-fit font-Pacifico">
        OnePanel
        <span className="absolute h-10 bg-green-300 -bottom-5 w-52 -left-2 -z-10"></span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-sm gap-6 p-10 mx-auto bg-white"
      >
        <h2 className="font-medium">Login</h2>
        <div className="w-8 h-2 bg-green-400 rounded-sm"></div>
        <TextInput
          name="username"
          placeholder="Username"
          label="Username"
          withAsterisk
          className="w-full"
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          label="Password"
          withAsterisk
          className="w-full"
        />
        <Button color="primary" type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
