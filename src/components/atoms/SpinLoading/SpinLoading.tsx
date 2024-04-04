import { getLocalStorage } from "@app/config/storage";
import { ACCESS_TOKEN } from "@app/constant/auth";
import { FC, useEffect, useState } from "react";

type Props = {
  size?: "small" | "medium" | "large";
};

const SpinLoading: FC<Props> = ({ size }) => {
  const accessToken = getLocalStorage(ACCESS_TOKEN);

  if (!accessToken) {
    window.location.href = `${location.origin}/login`;
  }
  const spinSize = size ? size : "medium";

  const [outSize, setOutSize] = useState<string>();
  const [inSize, setInSize] = useState<string>();

  useEffect(() => {
    if (spinSize === "large") {
      setOutSize("20");
      setInSize("16");
    } else if (spinSize === "medium") {
      setOutSize("14");
      setInSize("12");
    } else {
      setOutSize("8");
      setInSize("6");
    }
  }, []);

  return (
    <div
      className=" flex w-screen 
            h-screen flex-col justify-center 
            gap-1 items-center"
    >
      <div className="bg-gray-200 w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-200">
          <div
            className={`flex h-${outSize} w-${outSize} items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 animate-spin`}
          >
            <div
              className={`h-${inSize} w-${inSize} rounded-full bg-gray-200`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinLoading;
