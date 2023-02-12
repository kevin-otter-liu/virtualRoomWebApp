import { Html} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { Fragment, useState } from 'react';
import * as THREE from 'three';
import { BackSide, Euler, Vector3 } from 'three';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import { VirtualHouse } from '../../types/responses/VirtualHouse';
import { VirtualRoomObjectPropI } from '../../types/virtual-room/VirtualRoomObjectPropI';
import AddDoorForm from '../forms/AddDoorForm';
import ImageForm from '../forms/ImageForm';
import WallTextObject from './WallTextObject';

// function to calculate the position to put the door texts and buttons on the virtualroom walls
const calculateHTMLDoorLocation = (
  cubePosition: Array<number>,
  boxArgs: Array<number>
) => {
  const [x, y, z] = cubePosition;
  const [l, h, d] = boxArgs;

  const doorPosition: Array<Array<number>> | null = [
    [x + l / 2, y, z],
    [x - l / 2, y, z],
    [x, y + h / 2, z],
    [x, y - h / 2, z],
    [x, y, z + d / 2],
    [x, y, z - d / 2],
  ];
  return doorPosition;
};

const doorRotation = [
  [0, -Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [Math.PI / 2, 0, 0],
  [-Math.PI / 2, 0, 0],
  [Math.PI, 0, Math.PI],
  [0, 0, 0],
];

const VirtualRoomObject: React.FC<VirtualRoomObjectPropI> = (props) => {
  // put default pic as empty pics
  const {camera} = useThree()
  const VHCtx = useContext(VirtualHouseContext);
  const [showImageForm, setShowImageForm] = useState<boolean>(false);
  const [showDoorForm, setShowDoorForm] = useState<boolean>(false);
  const [focusedWallFace, setFocusedWallFace] = useState<number | null>(null);
  const [textures, setTextures] = useState<Array<THREE.Texture | null>>([]);

  const handleImageFormSubmitResponse = (newVirtualHouse: VirtualHouse) => {
    console.log(newVirtualHouse);
    VHCtx.setVirtualHouse(newVirtualHouse);
  };

  const handleDoorFormSubmitResponse = (virtual_house: VirtualHouse) => {
    VHCtx.setVirtualHouse(virtual_house);
    
  };

  const texturizeWallsAndCreateMeshes = useCallback(() => {
    let loader = new THREE.TextureLoader();
    let newWallTextures = props.virtualRoom.virtual_walls.map((virtualWall) => {
      // setting textures
      return virtualWall.image?loader.load(virtualWall.image.url!): null;
    });

    setTextures(newWallTextures);
  }, [props.virtualRoom, textures]);

  useEffect(() => {
    texturizeWallsAndCreateMeshes();
  }, [props.virtualRoom]);

  const renderWallMeshes = useCallback(() => {
    let newWallMeshes = textures.map((texture, index) => {
      if (!texture) {
        return (
          <meshBasicMaterial
            key={`mesh-basic-material-${index}`}
            attach={`material-${index}`}
            color='green'
            side={BackSide}
            transparent
            opacity={0.8}
          />
        );
      } else {
        return (
          <Suspense fallback={null}>
            <meshBasicMaterial
              key={`mesh-basic-material-${index}`}
              attach={`material-${index}`}
              map={texture}
              side={BackSide}
            />
          </Suspense>
        );
      }
    });
    return newWallMeshes;
  }, [textures]);

  useEffect(() => {
    console.log('virtualRoomObject rerendered');
    console.log('virtual room props');
    console.log(props.virtualRoom);
  });

  const doorPositions = calculateHTMLDoorLocation(
    [props.virtualRoom.x, props.virtualRoom.y, props.virtualRoom.z],
    [
      props.virtualRoom.length,
      props.virtualRoom.height,
      props.virtualRoom.depth,
    ]
  );

  // Handler for image button click
  const onImageButtonClick = (e: React.MouseEvent) => {
    const indexStr = e.currentTarget.getAttribute('value');
    if (indexStr) {
      const faceIndex = parseInt(indexStr);
      setShowImageForm(true);
      setFocusedWallFace(faceIndex);
    } else {
      console.log(`no index found`);
    }
  };

  // Handler for door button click
  const onDoorButtonClick = (e: React.MouseEvent) => {
    const indexStr = e.currentTarget.getAttribute('value');
    if (indexStr) {
      const faceIndex = parseInt(indexStr);
      setShowDoorForm(true);
      setFocusedWallFace(faceIndex);
    } else {
      console.log(`no index found`);
    }
  };

  // todo: swithc acmera to set to next room, 
  // might need to implement a method to search for next room on client in context
  const onNextRoomClick = (e: React.MouseEvent)=>{
    const indexStr = e.currentTarget.getAttribute('value');
    if (indexStr) {
      const faceIndex = parseInt(indexStr);
      setFocusedWallFace(faceIndex);
      let currWall = props.virtualRoom.virtual_walls[faceIndex]
      let nextRoom = VHCtx.getNextRoomFromWallId(currWall.id)
      if(!nextRoom){
        console.log('what')
        return null;
      }
      console.log('next room function here')
      console.log(nextRoom)
      camera.position.set(nextRoom.x, nextRoom.y, nextRoom.z)
    } else {
      console.log(`no index found`);
    }
  }

  const onImageFormExitHandler = () => {
    setShowImageForm(false);
  };

  const onDoorFormExitHandler = () => {
    setShowDoorForm(false);
  };

  // Rendering WallText JSX
  const wallTexts = doorPositions.map((doorPosition, index) => {
    return (
      <WallTextObject
        createMode={props.createMode}
        scale={props.virtualRoom.length * 0.1}
        doorPosition={doorPosition}
        doorRotation={doorRotation[index]}
        index={index}
        key={`wall-text-${index}`}
        onImageButtonClick={onImageButtonClick}
        onDoorButtonClick={onDoorButtonClick}
        onNextRoomClick={onNextRoomClick}
        showDoorButton={!props.virtualRoom.virtual_walls[index].is_door}
      />
    );
  });

  return (
    <Fragment>
      <mesh
        position={
          new Vector3(
            props.virtualRoom.x,
            props.virtualRoom.y,
            props.virtualRoom.z
          )
        }>
        <boxGeometry
          args={[
            props.virtualRoom.length,
            props.virtualRoom.height,
            props.virtualRoom.depth,
          ]}
        />
        {renderWallMeshes()}
      </mesh>
      {wallTexts}
      {showImageForm && (
        <Html
          scale={0.2}
          rotation={new Euler(...doorRotation[focusedWallFace!])}
          position={new Vector3(...doorPositions[focusedWallFace!])}
          transform>
          <ImageForm
            onExitHandler={onImageFormExitHandler}
            handlePostSubmitResponse={handleImageFormSubmitResponse}
            virtual_room_id={props.virtualRoom.id}
            virtual_wall_id={
              props.virtualRoom.virtual_walls[focusedWallFace!].id
            }
            face={focusedWallFace!}
          />
        </Html>
      )}
      {showDoorForm && (
        <Html
          scale={0.2}
          rotation={new Euler(...doorRotation[focusedWallFace!])}
          position={new Vector3(...doorPositions[focusedWallFace!])}
          transform>
          <AddDoorForm
            onExitHandler={onDoorFormExitHandler}
            handlePostSubmitResponse={handleDoorFormSubmitResponse}
            virtual_room_id={props.virtualRoom.id}
            virtual_wall_id={
              props.virtualRoom.virtual_walls[focusedWallFace!].id
            }
            face={focusedWallFace!}
          />
        </Html>
      )}
    </Fragment>
  );
};

export default VirtualRoomObject;
