import { Html } from '@react-three/drei';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Fragment, useState } from 'react';
import * as THREE from 'three';
import { BackSide, Euler, Texture, Vector3 } from 'three';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import { VirtualHouse } from '../../types/contexts/responses/VirtualHouse';
import { VirtualWall } from '../../types/contexts/responses/VirtualWall';
import { VirtualRoomObjectPropI } from '../../types/virtual-room/VirtualRoomObjectPropI';
import ImageForm from '../forms/ImageForm';
import WallTextObject from './WallTextObject';
import { Image } from '../../types/contexts/responses/Image';

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

type ImageFormData = {
  showImageForm: boolean;
  faceIndex: null | number;
  virtual_wall_id: string | null;
};

const VirtualRoomObject: React.FC<VirtualRoomObjectPropI> = (props) => {
  // put default pic as empty pics
  const [description, setDescription] = useState<string>('');
  const VHCtx = useContext(VirtualHouseContext);
  // const [thisVirtualRoom, setThisVirtualRoom] = useState<VirtualRoom>(
  //   props.virtualRoom
  // );
  const [file, setFile] = useState<File>();
  const [update, forceRender] = useState<string>('');

  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    showImageForm: false,
    faceIndex: null,
    virtual_wall_id: null,
  });

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

  // useEffect(() => {

  // },[wallMesh,virtualWalls]);

  const doorPositions = calculateHTMLDoorLocation(
    [props.virtualRoom.x, props.virtualRoom.y, props.virtualRoom.z],
    [
      props.virtualRoom.length,
      props.virtualRoom.height,
      props.virtualRoom.depth,
    ]
  );

  // change event for changing the image input into the form
  const onImageInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
  };

  // Handler for image button click
  const onImageButtonClick = (e: React.MouseEvent) => {
    const indexStr = e.currentTarget.getAttribute('value');
    if (indexStr) {
      const faceIndex = parseInt(indexStr);
      setImageFormData({
        faceIndex: faceIndex,
        showImageForm: true,
        virtual_wall_id: props.virtualRoom.virtual_walls[faceIndex].id,
      });
    } else {
      console.log(`no index found`);
    }
  };

  // handler for the onclick event on the exit button to exit the image form
  const imageFormExitHandler = () => {
    setImageFormData((state) => {
      return {
        ...state,
        showImageForm: false,
      };
    });
  };

  // hanlder for submitting the image form
  const onSubmitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setImageFormData((state) => {
      return {
        ...state,
        showImageForm: false,
      };
    });
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append(
        'data',
        JSON.stringify({
          face: imageFormData.faceIndex,
          virtual_wall_id: imageFormData.virtual_wall_id,
        })
      );
      const res: AxiosResponse = await axios.post(
        'http://localhost:3000/virtual-house/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      let { image_url, image_id, face } = res.data;

      VHCtx.setVirtualHouse((prevVirtualHouse) => {
        if (prevVirtualHouse) {
          let newVirtualRooms = prevVirtualHouse.virtual_rooms.map(
            (virtual_room) => {
              if ((virtual_room.id = props.virtualRoom.id)) {
                let newVirtualWalls = virtual_room.virtual_walls.map(
                  (virtual_wall) => {
                    if (virtual_wall.face == face) {
                      let newVirtualWall: VirtualWall = {
                        ...virtual_wall,
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
          console.log(newVirtualHouse);
          return newVirtualHouse;
        } else {
          return prevVirtualHouse;
        }
      });
    }
  };

  // image description text change handler
  const onTextInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDescription(event.target.value);
  };

  // Rendering WallText JSX
  const wallTexts = doorPositions.map((doorPosition, index) => {
    return (
      <WallTextObject
        doorPosition={doorPosition}
        doorRotation={doorRotation[index]}
        index={index}
        key={`wall-text-${index}`}
        onClick={onImageButtonClick}
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
      {imageFormData.showImageForm && (
        <Html
          scale={0.2}
          rotation={new Euler(...doorRotation[imageFormData.faceIndex!])}
          position={new Vector3(...doorPositions[imageFormData.faceIndex!])}
          transform>
          <ImageForm
            description={description}
            onTextInputChange={onTextInputChangeHandler}
            text={`${imageFormData.faceIndex}`}
            onFormSubmit={onSubmitFormHandler}
            onExitForm={imageFormExitHandler}
            onImageInputChange={onImageInputChange}
          />
        </Html>
      )}
    </Fragment>
  );
};

export default VirtualRoomObject;
