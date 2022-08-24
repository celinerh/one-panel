import { Navbar, NavLink, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  HiShoppingBag,
  HiClipboardList,
  HiUsers,
  HiLogout,
} from "react-icons/hi";

const navLinks = [
  { to: "/products", label: "Products", icon: HiShoppingBag },
  { to: "/orders", label: "Orders", icon: HiClipboardList },
  { to: "/customers", label: "Customers", icon: HiUsers },
];

function Navigation() {
  const location = useLocation();

  return (
    <Navbar height="100vh" p="xs" width={{ base: 300 }}>
      <Navbar.Section>
        <h1 className="mx-auto text-4xl w-fit font-Pacifico">OnePanel</h1>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        {navLinks.map((navLink, index) => (
          <NavLink
            component={Link}
            to={navLink.to}
            label={
              <Text className="text-gray-600 text-1xl">{navLink.label}</Text>
            }
            icon={<navLink.icon className="w-6 h-6 text-gray-400" />}
            active={location.pathname === navLink.to}
            color="gray"
            key={index}
          />
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <NavLink
          component={Link}
          to="/login"
          label="Log out"
          icon={<HiLogout className="w-6 h-6 text-gray-400" />}
        />
      </Navbar.Section>
    </Navbar>
  );
}

export default Navigation;
