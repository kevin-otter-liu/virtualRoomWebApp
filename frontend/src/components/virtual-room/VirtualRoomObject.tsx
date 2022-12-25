import { Html, useTexture } from '@react-three/drei';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { BackSide, Euler, Vector3 } from 'three';
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
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState('');
  const [textureUrls, setTextureUrls] = useState<Array<string>>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    showImageForm: false,
    faceIndex: null,
  });

  useEffect(() => {
    textureUrls.map((url) => {
      url === '' ? 'assets/default-walls/default.png' : url;
    });
  }, [textureUrls]);

  const textures = useTexture<string[]>(props.urls);

  const doorPositions = calculateHTMLDoorLocation(
    props.position,
    props.boxArgs
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
      console.log(formData);
      const res = await axios.post(
        'http://localhost:3000/virtual-room/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjVjMzAxZjUtZDI4OS00NmVhLWE3ZjMtZTU1NmYxZWVlNDUzIiwiaWF0IjoxNjcxOTEyMjYyLCJleHAiOjE2NzE5MTU4NjJ9.KD793E7VJ1Bcxdlde8uyW4zz0zJ-D1QMS-yHqxt40Hs",
          },
        }
      );

      console.log(res)
    }
  };

  // image description text change handler
  const onTextInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDescription(event.target.value);
    console.log(description);
  };

  const wallTexts = doorPositions.map((doorPosition, index) => {
    return (
      <WallTextObject
        doorPosition={doorPosition}
        doorRotation={doorRotation[index]}
        index={index}
        onClick={onImageButtonClick}
      />
    );
  });

  return (
    <Fragment>
      <mesh position={new Vector3(...props.position)}>
        <boxGeometry args={props.boxArgs} />
        {textures.map((texture, index) => {
          const meshMaterial = (
            <meshBasicMaterial
              key={index}
              attach={`material-${index}`}
              map={texture}
              side={BackSide}
            />
          );
          return meshMaterial;
        })}
      </mesh>
      {wallTexts}
      {/* Image form */}
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
