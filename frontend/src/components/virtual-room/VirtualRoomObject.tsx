import { Html, useTexture } from '@react-three/drei';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { Fragment, useState } from 'react';
import { BackSide, CompressedPixelFormat, Euler, Vector3 } from 'three';
import { VirtualRoom } from '../../types/contexts/responses/VirtualRoom';
import { VirtualWall } from '../../types/contexts/responses/VirtualWall';
import { VirtualRoomObjectPropI } from '../../types/virtual-room/VirtualRoomObjectPropI';
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

type ImageFormData = {
  showImageForm: boolean;
  faceIndex: null | number;
};

const VirtualRoomObject: React.FC<VirtualRoomObjectPropI> = (props) => {
  // put default pic as empty pics
  const [description,setDescription] = useState<string>("")
  const [thisVirtualRoom, setThisVirtualRoom] = useState<VirtualRoom>(props.virtualRoom)
  const [virtualWalls,setVirtualWalls] = useState<Array<VirtualWall>>(props.virtualWalls)
  const [wallMesh, setWallMesh] = useState<Array<JSX.Element | undefined>>([]);
  const [file, setFile] = useState<File>();



  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    showImageForm: false,
    faceIndex: null,
  });
  // const getImages() = useCallback(() => {
  //   // get all image urls from the database;

  //   let imageUrlRes = axios.get();
  //   // set all images
  //   setImageUrls(imageUrlsResponse)
  // },[imageUrls])

  useEffect(() => {

      const createdTextures = virtualWalls.map((virtualWall,index)=>{
        if(virtualWall.image_id == null){
          return <meshBasicMaterial
          key={`mesh-basic-material-${index}`}
          attach={`material-${index}`}
          color='green'
          side={BackSide}
          transparent
          opacity={0.8}
        />
        }else{
          console.log('load image from image url')
        }
      },[wallMesh])

      setWallMesh(createdTextures)
      
  }, [wallMesh]);

  // const textures = useTexture<string[]>(props.urls);

  const doorPositions = calculateHTMLDoorLocation(
    [thisVirtualRoom.x,thisVirtualRoom.y,thisVirtualRoom.z],
    [thisVirtualRoom.length, thisVirtualRoom.height,thisVirtualRoom.depth]
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

  // Handler for
  const onImageButtonClick = (e: React.MouseEvent) => {
    const index = e.currentTarget.getAttribute('value');

    if (index) {
      setImageFormData({
        faceIndex: parseInt(index),
        showImageForm: true,
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
      formData.append('data', JSON.stringify({description,caption:"random caption", face:imageFormData.faceIndex, virtual_room_id:"f5c301f5-d289-46ea-a7f3-e556f1eee453"}));
      const res = await axios.post(
        'http://localhost:3000/virtual-room/image',
        formData,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

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
      <mesh position={new Vector3(thisVirtualRoom.x,thisVirtualRoom.y,thisVirtualRoom.z)}>
        <boxGeometry args={[thisVirtualRoom.length,thisVirtualRoom.height,thisVirtualRoom.depth]} />
        {wallMesh}
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
