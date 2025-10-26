/**
 * @description 좌측 네비게이션 컴포넌트
 */

import { PATH_URL } from "@/shared";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" },
  { label: "Verification", to: PATH_URL.VERIFICATION },
  { label: "Missing Value", to: PATH_URL.MISSING_VALUE },
];

export const AppNav = () => {
  return (
    <nav>
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
