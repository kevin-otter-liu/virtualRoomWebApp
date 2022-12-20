import {ThreeEvent, useThree} from '@react-three/fiber'
import {ThreeCubeObjectProp} from '../../types/virtual-room/ThreeCubeObjectPropI'
import {Fragment, useRef, useState} from 'react'
import * as THREE from 'three'
import {useCursor, useSelect, useTexture} from '@react-three/drei'
import { BufferGeometry, Material, Mesh, Vector3 } from 'three'



const ThreeCubeObject:React.FC<ThreeCubeObjectProp> = (props) => {
    // const setCamera = useThree((state)=>state.set)
    // setCamera({camera: new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)})

    // axesHelper: x-red, y-green, z-blue
    const textures = useTexture<string[]>(props.urls)
    const references:Array<React.Ref<THREE.MeshBasicMaterial>>=[]
    // const anotherRef = useRef<THREE.Mesh>(null!)

    // const onPointerOverHandler = (event:ThreeEvent<PointerEvent>) =>{
    //     if(event.faceIndex){
    //         console.log(references[Math.floor(event.faceIndex/2)]!.current.color.setHex( 0x00ffff ))
    //         console.log(references[Math.floor(event.faceIndex/2)])
    //     }
    // }

    
    return(
    <Fragment>
        <mesh onClick={props.onFaceClick} position={props.position} >

            {/* <primitive object={new THREE.AxesHelper(5)}></primitive> */}
            <boxGeometry args={props.boxArgs}/>
            {textures.map((texture,index)=>{
                references.push(useRef<THREE.MeshBasicMaterial>(null!))
                return <meshBasicMaterial key={index} ref={references[index]} attach={`material-${index}`} map={texture} side={THREE.BackSide}/>
            })}
        </mesh>
    </Fragment>
    )
}


export default ThreeCubeObject;