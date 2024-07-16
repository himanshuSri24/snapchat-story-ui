import ellipsis from "../assets/images/ellipsis.svg";
import camera from "../assets/images/camera.svg";

export const BottomBarSnapchatStory = () => {
  return (
    <div className="flex gap-2 h-[35px]">
      <span className="w-[45px] rounded-full bg-[#444] text-white flex justify-center items-center align-middle border-gray-600 border">
        <img src={camera} alt="N/A" className="w-5 h-5" />
      </span>
      <span className="w-[180px] rounded-full bg-[#444] text-white text-[8px] font-bold flex justify-center items-center align-middle border-gray-600 border">
        View Profile
      </span>
      <span className="w-[45px] rounded-full bg-[#444] text-white flex justify-center items-center align-middle border-gray-600 border">
        <img src={ellipsis} alt="N/A" className="w-4 h-4" />
      </span>
    </div>
  );
};

export default BottomBarSnapchatStory;
