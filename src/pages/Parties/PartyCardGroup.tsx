import { FC, useState } from "react";
import { Party } from "../../types";
import { Link } from "react-router-dom";
import { formatDate, getDayAgo } from "../../utils";
import { motion } from "motion/react";
import { Pagination } from "../../components";

interface PartyCardGroupProps {
  parties: Party[];
}

const PartyCardGroup: FC<PartyCardGroupProps> = ({ parties }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const partiesPerPage = 6;

  // Calculate indexes for pagination
  const totalPages = Math.ceil(parties.length / partiesPerPage);
  const startIndex = (currentPage - 1) * partiesPerPage;
  const selectedParties = parties.slice(
    startIndex,
    startIndex + partiesPerPage
  );

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        {selectedParties.map((party, index) =>
          party.creator ? (
            <motion.div
              key={party._id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", delay: index * 0.1 }}
            >
              <Link
                to={`parties/${party._id}`}
                className="w-full flex flex-1 flex-row items-start gap-4 overflow-hidden p-4 hover:shadow-lg border border-white bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out hover:border-[#c4f70f]"
              >
                <img
                  src={party.creator.avatar ?? ""}
                  alt={party.creator.name ?? ""}
                  className="w-[100px] h-[100px] rounded-full shadow-lg object-cover object-center"
                />
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <h1 className="text-black text-base">
                      <strong>{party.title}</strong>
                    </h1>
                    <h2 className="text-green-500 text-sm">
                      <strong>{getDayAgo(party.createdAt)}</strong> posted
                    </h2>
                  </div>
                  <p className="text-black text-sm h-[50px] overflow-hidden">
                    {party.description}
                  </p>
                  <div className="w-full flex flex-row items-center justify-end gap-8">
                    <h2 className="text-blue-500 text-sm">
                      Opening Date:{" "}
                      <strong>{formatDate(party.openingAt)}</strong>
                    </h2>
                    <h2 className="text-cyan-500 text-sm">
                      Party Type: <strong>{party.type.toUpperCase()}</strong>
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : null
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PartyCardGroup;
