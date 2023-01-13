import ow from "../assets/ow.webp";

export const Citetation = () => {
  return (
    <div
      id="citetation"
      className="z-10 m-2 mt-12 text-center text-sm capitalize dark:font-semibold dark:text-gray-300"
    >
      <span className="mb-2 block">Powered By:</span>
      <img src={ow} alt="Open Weather" width={100} height={50} />
    </div>
  );
};
