import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1>Error!</h1>
      <h2>Page not found!</h2>
      <Link to="/">Go Back To Home Page</Link>
    </div>
  );
}
