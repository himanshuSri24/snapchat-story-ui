import { useState } from "react";
import "./App.css";

import { SnapchatUI } from "./components/SnapchatUI";
import { getImageArray, getVideo } from "./utils/getMedia";
import logo from "./assets/images/logo.svg";

function App() {
  const [SnapchatUIProps, setSnapchatUIProps] = useState({
    type: "STORY",
    mediaType: "IMAGE",
    numberOfItems: 1,
    urls: getImageArray(1),
    logo: logo,
    userName: "OneUp App",
  });

  const onClickHandler = (type, num) => {
    switch (type) {
      case "VIDEO":
        setSnapchatUIProps({
          ...SnapchatUIProps,
          numberOfItems: 1,
          mediaType: "VIDEO",
          urls: getVideo(),
        });
        break;
      case "IMAGE":
        setSnapchatUIProps({
          ...SnapchatUIProps,
          numberOfItems: num,
          urls: getImageArray(num),
          mediaType: "IMAGE",
        });
        break;
      default:
        console.error("INVALID TYPE");
        break;
    }
  };

  return (
    <div className="h-full w-full py-10 pl-10">
      <SnapchatUI {...SnapchatUIProps} className="flex-shrink-0" />
      <div className="flex flex-col mt-10 w-[300px] gap-4">
        <span className="text-xl uppercase font-semibold">Demo Buttons:</span>
        <button
          className="border-2 rounded-lg py-2 px-4 bg-blue-300 border-blue-300"
          onClick={() => onClickHandler("IMAGE", 1)}
        >
          1 Image
        </button>
        <button
          className="border-2 rounded-lg py-2 px-4 bg-blue-400 border-blue-400"
          onClick={() => onClickHandler("IMAGE", 3)}
        >
          3 Images
        </button>
        <button
          className="border-2 rounded-lg py-2 px-4 bg-blue-500 border-blue-500"
          onClick={() => onClickHandler("VIDEO", 1)}
        >
          1 Video
        </button>
      </div>
    </div>
  );
}

export default App;
