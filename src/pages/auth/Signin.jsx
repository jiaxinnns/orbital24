import React, { useRef, Suspense } from "react";
import SignInCard from "../../components/auth/SignInCard";

import CafeGraphic from "../../assets/SignupCafe.png";
import { Canvas } from "@react-three/fiber";
import Sky from "../../models/Sky";
import SignupGraphic from "../../assets/SignupGraphic.jpeg";
import logo from "../../assets/logo.png";

const Signin = () => {
  const adjustSkyForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      // small screen
      screenScale = [1, 1, 1]; // smaller scale
    } else {
      screenScale = [1.2, 1.2, 1.2];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [skyScale, skyPosition, skyRotation] = adjustSkyForScreenSize(); // props for our sky

  return (
    <div className="h-screen w-full grid grid-cols-2 gap-4 justify-center">
      <div className="bg-orange-100 h-full items-center justify-center">
        <img src={SignupGraphic} className="w-full h-full object-cover"></img>
      </div>
      <div className=" p-12 h-screen flex flex-col justify-center">
        <div className="flex justify-center pb-12">
          <img src={logo} className="w-1/3 flex"></img>
        </div>
        <SignInCard />
      </div>
    </div>
  );
};

export default Signin;
