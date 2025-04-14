import { Icon } from "@iconify/react";
import { Party } from "../../types";
import { motion } from "motion/react";
import { getTimeAgo } from "../../utils";
import { Link } from "react-router-dom";

const PartyInviteCardGroup = ({ parties }: { parties: Party[] }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {parties.map((party, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", delay: index * 0.1 }}
          className="flex items-center p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white hover:shadow-lg hover:border-[#c4f70f] group"
        >
          <Icon
            icon="solar:wineglass-bold-duotone"
            className="text-sky-500 w-6 h-6"
          />
          <div className="ml-3 overflow-hidden w-full">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-black text-xs">
                <strong>{party.title}</strong>
              </h2>
              <div className="flex flex-row items-center gap-2">
                <span className="text-gray-600 text-xs">
                  {getTimeAgo(party.createdAt)}
                </span>
                <Link
                  to={`/parties/${party._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out p-1 rounded-xl shadow-lg scale-0 group-hover:scale-100 bg-[#c4f70f]"
                >
                  <Icon
                    icon="solar:arrow-right-line-duotone"
                    className="w-4 h-4 text-black"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PartyInviteCardGroup;
