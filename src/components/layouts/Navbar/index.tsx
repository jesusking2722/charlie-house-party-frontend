import { LinkIconButton } from "../../common";
import { motion } from "motion/react";

const Navbar = () => {
  return (
    <motion.header
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring" }}
      className="w-[100px] fixed left-0 top-0 min-h-screen bg-black/5 backdrop-blur-sm shadow-lg"
    >
      <nav className="w-full py-14 px-4 text-center">
        <ul className="flex flex-col gap-4">
          <LinkIconButton
            label="Menu"
            icon="solar:sidebar-minimalistic-bold-duotone"
            path=""
          />
          <LinkIconButton
            label="Profile"
            icon="solar:user-bold-duotone"
            path=""
          />
          <LinkIconButton
            label="Notification"
            icon="solar:bell-bing-bold-duotone"
            path=""
          />
          <LinkIconButton
            label="Chat"
            icon="solar:chat-line-bold-duotone"
            path=""
          />
          <LinkIconButton label="Shop" icon="solar:shop-bold-duotone" path="" />
          <LinkIconButton
            label="Log out"
            icon="solar:logout-bold-duotone"
            path=""
          />
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
