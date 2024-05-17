import React, { useRef, Suspense } from "react";
import SignInCard from "../../components/auth/SignInCard";

import { Canvas } from "@react-three/fiber";
import Sky from "../../models/Sky";

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
    <section className="w-screen h-screen relative flex">
      <div className="absolute z-10 w-96 pb-10 pt-10 pl-10">
        <SignInCard className="h-screen" />
      </div>
      <Canvas
        className="bg-transparent absolute left-0"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense>
          <directionalLight position={[0, 0, 0]} intensity={2} />
          <ambientLight intensity={1} />
          <Sky position={[0, 0, 0]} scale={skyScale} rotation={skyRotation} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Signin;
