import { useState, useRef, useEffect } from "react";
import { BottomBarSnapchatStory } from "./BottomBarSnapchatStory";
import bookmark from "../assets/images/bookmark.svg";
import heart from "../assets/images/heart.svg";
import share from "../assets/images/share.svg";
import play from "../assets/images/play.svg";

const Story = (props) => {
  const { numberOfItems, urls, mediaType, logo, userName } = props;
  const [displayImage, setDisplayImage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  const handleImageClick = (e) => {
    const imgWidth = e.target.clientWidth;
    const clickPosition = e.clientX - e.target.getBoundingClientRect().left;

    if (clickPosition < imgWidth / 2) {
      if (displayImage === 0) {
        return;
      }
      setDisplayImage((prev) => (prev > 0 ? prev - 1 : numberOfItems - 1));
    } else {
      if (displayImage === numberOfItems - 1) {
        return;
      }
      setDisplayImage((prev) => (prev < numberOfItems - 1 ? prev + 1 : 0));
    }
  };

  const handleVideoClick = (e) => {
    if (e.target.paused) {
      e.target.play();
      setIsVideoPlaying(true);
    } else {
      e.target.pause();
      setIsVideoPlaying(false);
    }
  };

  useEffect(() => {
    if (mediaType === "VIDEO" && videoRef.current) {
      const video = videoRef.current;
      const handleTimeUpdate = () => {
        setVideoProgress((video.currentTime / video.duration) * 100);
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [displayImage, mediaType]);

  return (
    <div className="w-[300px] relative aspect-[9/16] rounded-lg bg-black text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex absolute z-20 w-full gap-1 pt-2 px-2 h-[1px]">
        {mediaType === "IMAGE" &&
          Array.from({ length: numberOfItems }, (_, i) => i).map((i) => (
            <div
              className={`w-full h-[1px] px-4 bg-white ${
                i < displayImage ? "opacity-100" : "opacity-50"
              }`}
              key={i}
              onClick={() => setDisplayImage(i)}
            ></div>
          ))}
        {mediaType === "VIDEO" && (
          <div className="absolute w-full h-[1px] bg-gray-500">
            <div
              className="h-[1px] bg-white"
              style={{ width: `${videoProgress}%` }}
            ></div>
          </div>
        )}
      </div>
      {/* UserName and Image */}
      <div className="absolute top-4 left-2 w-full h-auto flex items-start justify-start gap-[8px]">
        <div className="bg-white rounded-full">
          <img src={logo} alt="N/A" className="w-8 h-8" />
        </div>

        <div className="flex flex-col items-start justify-between">
          <span className="text-xs font-semibold whitespace-nowrap">
            {userName}
          </span>
          <span className="text-[10px] ml-[1px] absolute whitespace-nowrap bottom-0 font-light opacity-90">
            1 min ago
          </span>
        </div>
      </div>

      {/* Bookmark */}
      <img
        src={bookmark}
        alt="N/A"
        className="w-6 h-6 absolute top-5 right-2"
      />

      {/* Heart Icon */}
      <img
        src={heart}
        alt="N/A"
        className="w-8 h-8 absolute bottom-28 right-3"
      />

      {/* Share Icon */}
      <img
        src={share}
        alt="N/A"
        className="w-6 h-6 absolute bottom-16 right-4"
      />

      {/* Camera, View Profile and ... */}
      <div className="absolute bottom-4 w-full px-2">
        <BottomBarSnapchatStory />
      </div>

      {/* Play Icon */}
      {mediaType === "VIDEO" && !isVideoPlaying ? (
        <img
          src={play}
          alt="N/A"
          className="absolute w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={handleVideoClick}
        />
      ) : null}

      {/* Media on Story */}
      {mediaType === "VIDEO" ? (
        <video
          ref={videoRef}
          src={urls[displayImage]}
          autoPlay={true}
          loop={true}
          alt="N/A"
          className="w-full h-[88%] object-fill"
          onClick={handleVideoClick}
        />
      ) : (
        <img
          src={urls[displayImage]}
          alt="N/A"
          className="w-full h-[88%] object-fill"
          onClick={handleImageClick}
        />
      )}
    </div>
  );
};

export const SnapchatUI = (props) => {
  if (props.type === "STORY") {
    return <Story {...props} />;
  }
  // in case of other types, you can add those here, since snapchat just has story for now, building for that
  // I added option for types just in case it changes in future
  return <div>Type UI Not made - Snapchat</div>;
};

export default SnapchatUI;
