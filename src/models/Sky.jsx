import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import skyScene from "../assets/3d/sky.glb";

const Sky = (props) => {
  const skyRef = useRef();
  const { nodes, materials } = useGLTF(skyScene);

  useFrame((_, delta) => {
    // delta is the number of milliseconds between renders
    if (true) {
      skyRef.current.rotation.y += 0.2 * delta;
    }
  });

  return (
    <group {...props} ref={skyRef}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.M_Sky_Panning_Clouds2}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default Sky;
