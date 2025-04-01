import { motion } from "motion/react";
import IconButton from "../IconButton";

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modal */}
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row w-full items-center justify-between">
              <h2 className="text-base text-black font-semibold">{title}</h2>
              <IconButton icon="mdi:times" onClick={onClose} />
            </div>
            <div className="w-full mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
