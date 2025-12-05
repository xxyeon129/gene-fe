/**
 * @description 404 에러 페이지
 */

import { Link } from "react-router-dom";

export const NotFoundErrorPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};
