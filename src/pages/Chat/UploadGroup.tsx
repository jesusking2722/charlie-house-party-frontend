import { Icon } from "@iconify/react";
import { Loader } from "../../components";

const UploadGroup = ({
  files,
  loading,
  onDelete,
}: {
  files: File[];
  loading: boolean;
  onDelete: (index: number) => void;
}) => {
  return (
    <>
      {loading ? (
        <div className="h-[150px] w-full flex flex-col items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[150px] w-full grid grid-cols-4 gap-4 overflow-x-hidden overflow-y-scroll p-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative w-full h-[150px] group transition-all duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`uploaded-${index}`}
                className="absolute h-full w-full object-cover rounded-lg z-0 top-0 left-0"
              />
              <div className="absolute w-full h-full group-hover:bg-black/5 rounded-lg group-hover:backdrop-blur-sm transition-all duration-300 ease-in-out z-10 flex flex-col items-center justify-center">
                <button
                  className="p-2 bg-white shadow-lg rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out hover:bg-gray-300"
                  onClick={() => {
                    onDelete(index);
                  }}
                >
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    className="text-black w-5 h-5"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadGroup;
