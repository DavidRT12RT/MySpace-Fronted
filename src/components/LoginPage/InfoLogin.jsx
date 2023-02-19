import React from 'react'

//RTF
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from '@react-three/postprocessing';

//Component's
import Gradient from './Gradient';
import { CloudArrowUpFill } from 'react-bootstrap-icons';

export const InfoLogin = () => {
    return (
        <div className="infoLoginContainer">
            <Canvas camera={{position:[0.0,0.0,.2]}}>
                <EffectComposer multisampling={0} disabledNormalPass={true}>
                    <Noise opacity={0.15}/>
                    <Gradient/>
                </EffectComposer>
            </Canvas>
            <div className="information">
                <h1 className="titulo">Digital platform <br/>for distance <span className="color">learning</span></h1>
                <p className="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquam at nam amet sapiente doloribus eveniet quod ratione!</p>
            </div>
        </div>
    )
}
