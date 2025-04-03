const VideoShower = ({
  title,
  videoSource,
}: {
  title: string;
  videoSource: string;
}) => {
  return (
    <iframe
      src={videoSource}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="w-full h-[500px] border border-white shadow-lg rounded-xl"
      allowFullScreen
    />
  );
};

export default VideoShower;
