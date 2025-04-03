import { LinkIconButton } from "../../common";
import { motion } from "motion/react";
import { useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ type: "spring" }}
      className="w-[100px] fixed left-0 top-0 min-h-screen bg-black/5 backdrop-blur-sm shadow-lg"
    >
      <nav className="py-14 px-4 text-center">
        <ul className="flex flex-col gap-4">
          <LinkIconButton
            label="Create"
            icon="solar:document-add-bold-duotone"
            path=""
            active={pathname.includes("create")}
          />
          <LinkIconButton
            label="Parties"
            icon="solar:documents-bold-duotone"
            path="/parties"
            active={pathname.includes("parties")}
          />
          <LinkIconButton
            label="Notification"
            icon="solar:bell-bing-bold-duotone"
            path=""
            active={pathname.includes("notification")}
          />
          <LinkIconButton
            label="Chat"
            icon="solar:chat-line-bold-duotone"
            path=""
            active={pathname.includes("chat")}
          />
          <LinkIconButton
            label="Shop"
            icon="solar:shop-bold-duotone"
            path=""
            active={pathname.includes("shop")}
          />
          <LinkIconButton
            label="Pricing"
            icon="solar:tag-price-bold-duotone"
            path="/pricing"
            active={pathname.includes("pricing")}
          />
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navbar;
