import { FC, useState } from "react";
import { Badge, Pagination, Rater, Tooltip } from "../../components";
import { Applicant } from "../../types";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getTimeAgo } from "../../utils";
import { BACKEND_BASE_URL } from "../../constant";

interface ApplicantGroupProps {
  applicants: Applicant[];
}

const ApplicantGroup: FC<ApplicantGroupProps> = ({ applicants }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const applicantsPerPage = 6;

  // Calculate indexes for pagination
  const totalPages = Math.ceil(applicants.length / applicantsPerPage);
  const startIndex = (currentPage - 1) * applicantsPerPage;
  const selectedApplicants = applicants.slice(
    startIndex,
    startIndex + applicantsPerPage
  );
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-row items-center gap-2">
        <h1 className="text-black font-semibold text-3xl">Applicants</h1>
        <Tooltip message={`Total ${selectedApplicants.length} applicants`}>
          <Icon
            icon="solar:documents-outline"
            className="text-green-500 w-8 h-8"
          />
        </Tooltip>
      </div>
      {selectedApplicants.map((applicant, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", delay: index * 0.1 }}
          className=""
        >
          <Link
            to={`/profile/${applicant.applier._id}`}
            className="w-full flex flex-1 flex-row items-start gap-4 rounded-xl border border-white bg-white/10 backdrop-blur-sm p-2 hover:shadow-lg hover:border-[#c4f70f] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              <img
                src={BACKEND_BASE_URL + applicant.applier.avatar}
                alt={applicant.applier.name ?? ""}
                className="w-[100px] h-[100px] rounded-full shadow-lg object-cover object-center"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-2">
                  <h2 className="">
                    <strong>{applicant.applier.name}</strong>
                  </h2>
                  {applicant.applier.kycVerified && <Badge type="kyc" />}
                  {applicant.applier.membership === "premium" && (
                    <Badge type="premium" />
                  )}
                </div>
                <Rater rate={applicant.applier.rate ?? 0} />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <div className="flex flex-row items-center justify-end gap-2">
                <h3 className="text-cyan-500 text-sm">
                  Applied:{" "}
                  <strong>
                    {getTimeAgo(applicant.appliedAt ?? new Date())}
                  </strong>
                </h3>
              </div>
              <p className="text-sm text-black max-h-[150px] overflow-auto">
                {applicant.applicant}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
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

export default ApplicantGroup;
