import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto w-fit">
      <h1 className="">Sorry</h1>
      <p>That page cannot be found</p>
      <Button component={Link} to="/login" className="bg-green-400">
        Back to the login page
      </Button>
    </div>
  );
}

export default NotFound;
