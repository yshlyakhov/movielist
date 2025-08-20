import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (
    <section className="content-container">
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist</p>
        <Link to="/">Go Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
