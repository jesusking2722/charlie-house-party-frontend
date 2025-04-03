import { FC } from "react";
import { Icon } from "@iconify/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        className={`p-2 rounded-lg group transition-all duration-300 ease-in-out ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300 hover:shadow-lg"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon
          icon="solar:skip-previous-bold-duotone"
          className={`w-6 h-6 ${
            currentPage === 1 ? "text-[#353737]" : "text-black"
          }`}
        />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            currentPage === page
              ? "bg-[#c4f70f] text-black shadow-lg"
              : "hover:bg-gray-300 hover:shadow-lg"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300 hover:shadow-lg"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {" "}
        <Icon
          icon="solar:skip-next-bold-duotone"
          className={`w-6 h-6 ${
            currentPage === 1 ? "text-[#353737]" : "text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
