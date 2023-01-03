import { Html } from '@react-three/drei';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Fragment, useState } from 'react';
import * as THREE from 'three';
import { BackSide, Euler, Texture, Vector3 } from 'three';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import { VirtualHouse } from '../../types/responses/VirtualHouse';
import { VirtualWall } from '../../types/responses/VirtualWall';
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
  const VHCtx = useContext(VirtualHouseContext);
  const [showImageForm, setShowImageForm] = useState<boolean>(false);
  const [showDoorForm, setShowDoorForm] = useState<boolean>(false);
  const [focusedWallFace, setFocusedWallFace] = useState<number | null>(null);

  const handleImageFormSubmitResponse = (
    virtual_room_id: string,
    face: number,
    is_door: boolean,
    image_url: string,
    image_id: string
  ) => {
    VHCtx.setVirtualHouse((prevVirtualHouse: VirtualHouse|null) => {
      if (prevVirtualHouse) {
        let newVirtualRooms = prevVirtualHouse.virtual_rooms.map(
          (virtual_room) => {
            if ((virtual_room.id = virtual_room_id)) {
              let newVirtualWalls = virtual_room.virtual_walls.map(
                (virtual_wall) => {
                  if (virtual_wall.face == face) {
                    let newVirtualWall: VirtualWall = {
                      ...virtual_wall,
                      is_door: is_door,
                      image: {
                        url: image_url,
                        id: image_id,
                      },
                    };
                    return newVirtualWall;
                  } else {
                    return virtual_wall;
                  }
                }
              );

              let newVirtualRoom = {
                ...virtual_room,
                virtual_walls: newVirtualWalls,
              };
              return newVirtualRoom;
            } else {
              return virtual_room;
            }
          }
        );

        let newVirtualHouse: VirtualHouse = {
          ...prevVirtualHouse,
          virtual_rooms: newVirtualRooms,
        };

        console.log('form submitted');
        return newVirtualHouse;
      } else {
        return prevVirtualHouse;
      }
    });
  };

  const handleDoorFormSubmitResponse = (virtual_house:VirtualHouse)=>{
    VHCtx.setVirtualHouse(virtual_house);
  }

  console.log(`here is ${props.virtualRoom.id}`)

  const texturizeWallsAndCreateMeshes = () => {
    console.log('recreating mesh');
    let loader = new THREE.TextureLoader();
    const newWallTextures = props.virtualRoom.virtual_walls.map(
      (virtualWall, index) => {
        // setting textures
        if (virtualWall.image && virtualWall.image.url) {
          return loader.load(virtualWall.image.url, () => {
            console.log('texture rendered');
          });
        } else {
          return null;
        }
      }
    );

    let newWallMeshes = newWallTextures.map((texture, index) => {
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
          <meshBasicMaterial
            key={`mesh-basic-material-${index}`}
            attach={`material-${index}`}
            map={texture}
            side={BackSide}
          />
        );
      }
    });
    return newWallMeshes;
  };
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
        doorPosition={doorPosition}
        doorRotation={doorRotation[index]}
        index={index}
        key={`wall-text-${index}`}
        onImageButtonClick={onImageButtonClick}
        onDoorButtonClick={onDoorButtonClick}
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
        {texturizeWallsAndCreateMeshes()}
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
