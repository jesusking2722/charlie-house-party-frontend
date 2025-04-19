import { Icon } from "@iconify/react";
import { Loader } from "../../components";
import { BASE_URL } from "../../constant";

const UploadGroup = ({
  files,
  loading,
  onDelete,
}: {
  files: File[];
  loading: boolean;
  onDelete: (index: number) => void;
}) => {
  const renderPreview = (file: File) => {
    const fileType = file.type;
    console.log(fileType);

    if (fileType.startsWith("image/")) {
      return (
        <>
          {loading ? (
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <Loader />
            </div>
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="absolute h-full w-full object-cover rounded-lg z-0 top-0 left-0"
            />
          )}
        </>
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <>
          {loading ? (
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <Loader />
            </div>
          ) : (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="absolute h-full w-full object-cover rounded-lg z-0 top-0 left-0"
            />
          )}
        </>
      );
    }

    // For docs (PDF, Word, etc.)
    return (
      <>
        {loading ? (
          <div className="absolute w-full h-full flex flex-col items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="absolute w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden p-2">
            <img
              src={BASE_URL + "/assets/pngs/doc.png"}
              alt="document-icon"
              className="h-12 w-12 object-contain z-0"
            />
            <h2 className="text-xs">{file.name}</h2>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="h-[150px] w-full grid grid-cols-4 gap-4 overflow-x-hidden overflow-y-scroll p-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="relative w-full h-[150px] group transition-all duration-300 ease-in-out cursor-pointer rounded-lg bg-gray-100 shadow-lg"
        >
          {renderPreview(file)}

          <div className="absolute w-full h-full group-hover:bg-black/5 rounded-lg group-hover:backdrop-blur-sm transition-all duration-300 ease-in-out z-10 flex flex-col items-center justify-center">
            <button
              className="p-2 bg-white shadow-lg rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out hover:bg-gray-300"
              onClick={() => onDelete(index)}
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
  );
};

export default UploadGroup;
