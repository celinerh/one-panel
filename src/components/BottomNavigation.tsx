import { HiClipboardList, HiShoppingBag, HiUsers } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/products", label: "Products", icon: HiShoppingBag },
  { to: "/orders", label: "Orders", icon: HiClipboardList },
  { to: "/customers", label: "Customers", icon: HiUsers },
];

function BottomNavigation({ className }: { className?: string }) {
  return (
    <nav
      className={`fixed bottom-0 left-0 z-[200] p-6 w-full bg-white border-t-2 border-gray-200 ${className}`}
    >
      <ul className="flex justify-evenly">
        {navLinks.map((navLink, index) => (
          <li key={index}>
            <NavLink
              to={navLink.to}
              className="flex flex-col items-center text-gray-600"
            >
              <navLink.icon className="text-xl sm:text-2xl" />
              <p className="text-xs sm:text-sm">{navLink.label}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
