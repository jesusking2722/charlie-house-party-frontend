import { useWindowSize } from "react-use";

const KycVerifier = ({ link }: { link: string }) => {
  const { height } = useWindowSize();

  return (
    <iframe
        title='kyc verify'
      src={link}
      height={(height / 3) * 2}
      className="rounded-xl shadow-lg w-full"
    />
  );
};

export default KycVerifier;
