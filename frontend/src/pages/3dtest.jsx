import React from "react";
import { Canvas } from "@react-three/fiber";
import Sky from "../models/Sky";

const test = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    <div>
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
    </div>
  );
};

export default test;
