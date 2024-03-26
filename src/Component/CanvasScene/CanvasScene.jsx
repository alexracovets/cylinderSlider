import { Canvas } from "@react-three/fiber";
import Slider from "../Slider/Slider";
import s from './CanvasScene.module.scss';
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function CanvasScene() {
  const [isSlide, setIsSlide] = useState(false);

  const swithOrbit = useControls({
    isOrbit: false
  })

  return (
    <Canvas className={isSlide ? s.scene + ' ' + s.grab : s.scene}>
      <color attach="background" args={["#1C252C"]} />
      <OrbitControls enabled={swithOrbit.isOrbit} />
      <Slider setIsSlide={setIsSlide} />
    </Canvas>
  );
}
