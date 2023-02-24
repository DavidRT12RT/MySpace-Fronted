import React from 'react'

//RTF
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from '@react-three/postprocessing';

//Component's
import Gradient from './Gradient';

export const InfoLogin = () => {
    return (
        <div className="infoAuthContainer">
            <Canvas camera={{position:[0.0,0.0,.2]}}>
                <EffectComposer multisampling={0} disabledNormalPass={true}>
                    <Noise opacity={0.15}/>
                    <Gradient/>
                </EffectComposer>
            </Canvas>
            <div className="information">
                <h1 className="titulo">Digital platform <br/>for save all your<b className="color"> files</b></h1>
                <p className="descripcion">Save all your files in one place and start not worry for your local space!</p>
            </div>
        </div>
    )
}
