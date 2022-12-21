import { Html, useTexture } from '@react-three/drei';
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
  props.urls.map((url) => {
    url === '' ? 'assets/default-walls/default.png' : url;
  });
  const textures = useTexture<string[]>(props.urls);

  const doorPositions = calculateHTMLDoorLocation(
    props.position,
    props.boxArgs
  );

  // handlers for wall texts
  const onImageButtonClick = (e: React.MouseEvent) => {
    const index = e.currentTarget.getAttribute('value');

    if(index){
        setImageFormData({
          faceIndex: parseInt(index),
          showImageForm: true,
        });
    }else{
        console.log(`no index found`)
    }
  };

  const imageFormExitHandler = () => {
    setImageFormData((state) => {
      return {
        ...state,
        showImageForm: false,
      };
    });
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


  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    showImageForm: false,
    faceIndex: null,
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
          <ImageForm text={`${imageFormData.faceIndex}`} onClick={imageFormExitHandler} />
        </Html>
      )}
    </Fragment>
  );
};

export default VirtualRoomObject;
