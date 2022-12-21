import { VirtualHouseObjectPropI } from '../../types/virtual-room/VirtualHouseObjectPropI';
import { Fragment, MouseEvent, useState } from 'react';
import { Html} from '@react-three/drei';
import ImageForm from '../forms/ImageForm';
import { Euler, Vector3 } from 'three';
import WallTextObject from './WallTextObject';
import VirtualRoomObject from './VirtualRoomObject';


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

// rotations for the texts on the virtual room walls
const doorRotation = [
  [0, -Math.PI / 2, 0],
  [0, Math.PI / 2, 0],
  [Math.PI / 2, 0, 0],
  [-Math.PI / 2, 0, 0],
  [Math.PI, 0, Math.PI],
  [0, 0, 0],
];

// type for Image Form data state
type ImageFormData = {
  showImageForm: boolean;
  faceIndex: null | number;
};


const VirtualHouseObject: React.FC<VirtualHouseObjectPropI> = (props) => {
  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    showImageForm: false,
    faceIndex: null,
  });

  const doorPositions = calculateHTMLDoorLocation(
    props.position,
    props.boxArgs
  );

  const imageFormExitHandler = () => {
    setImageFormData((state) => {
      return {
        ...state,
        showImageForm: false,
      };
    });
  };

  const onImageButtonClick = (e: MouseEvent) => {
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

  // array of jsx doors
  const wallTexts = doorPositions.map((doorPosition, index) => {
    return (
      <WallTextObject doorPosition={doorPosition} doorRotation={doorRotation[index]} index={index} onClick={onImageButtonClick}/>
    );
  });

  return (
    <Fragment>
      <VirtualRoomObject urls={props.urls} position={props.position} boxArgs={props.boxArgs}></VirtualRoomObject>
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

export default VirtualHouseObject;
