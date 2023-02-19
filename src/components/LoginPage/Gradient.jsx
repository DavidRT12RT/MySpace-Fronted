import { useEffect, useMemo, useRef, useCallback } from "react";

import { Vector2, Color } from "three";
import { useFrame } from "@react-three/fiber";

//Component's
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const Gradient = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const mousePosition = useRef({ x: 0, y: 0 });

    const updateMousePosition = useCallback((e) => {
        mousePosition.current = { x: e.pageX, y: e.pageY };
    }, []);

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#A1A3F7"),
      },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
        }),
    []);

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition, false);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition, false);
        };
    }, [updateMousePosition]);

    useFrame((state) => {
        const { clock } = state;

        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        mesh.current.material.uniforms.u_mouse.value = new Vector2(
            // mousePosition.current.x / 100,
            // mousePosition.current.y / 100
            1,1
        );
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    );
};

export default Gradient;