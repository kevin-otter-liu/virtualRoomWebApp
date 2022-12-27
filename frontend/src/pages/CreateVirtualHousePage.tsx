import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import { Fragment, useContext, useState } from 'react';
import CreateVirtualHouseForm from '../components/forms/CreateVirtualHouseForm';
import Button from '../components/ui/Button';
import VirtualRoomButton from '../components/ui/VirtualRoomButton';
import VirtualHouseCanvas from '../components/virtual-room/VirtualHouseCanvas';
import { AuthContext } from '../context/auth-context';
import { VirtualHouse } from '../types/contexts/responses/VirtualHouse';
const CreateVirtualHousePage: React.FC = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const onClick: React.MouseEventHandler = () => {
    setShowCreateForm(true);
  };

  // handlers for createVirtualHouseForm
  type createFormState = {
    description: string;
    virtualHouseName: string;
    x: number;
    y: number;
    z: number;
    length: number;
    height: number;
    depth: number;
  };

  // form states
  const [description, setDescription] = useState<string>('');
  const [virtualHouseName, setVirtualHouseName] = useState<string>('');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(0);
  const [length, setLength] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);
  const [depth, setDepth] = useState<number>(1);
  const [virtualHouse, setVirtualHouse] = useState<VirtualHouse | null>(null);

  const onFormSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const virtualHouseResponse = await axios.post(
      'http://localhost:3000/virtual-house/create',
      {
        description: description,
        wall_no: 6,
        x: x,
        y: y,
        z: z,
        length: length,
        height: height,
        depth: depth,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );

    let virtualHouse: VirtualHouse = virtualHouseResponse.data.virtual_house;
    setVirtualHouse(virtualHouse);
    setShowCreateForm(false);
  };

  const onExitForm = () => {
    setShowCreateForm(false);
  };

  // handlers
  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDescription(event.target.value);
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setVirtualHouseName(event.target.value);
  };

  const onXChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let x = parseInt(event.target.value);
    setX(x);
  };

  const onYChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let y = parseInt(event.target.value);
    setY(y);
  };

  const onZChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let z = parseInt(event.target.value);
    setZ(z);
  };

  const onLengthChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let length = parseInt(event.target.value);
    setLength(length);
  };

  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let height = parseInt(event.target.value);
    setHeight(height);
  };
  const onDepthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let depth = parseInt(event.target.value);
    setDepth(depth);
  };

  // exit Virtual Room Handler
  const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
    setVirtualHouse(null);
  };

  //
  return (
    <Fragment>
      {authCtx.isLoggedIn && (
        <Fragment>
          <Button type='button' onClick={onClick}>
            Create a new VirtualHouse
          </Button>
          {showCreateForm && (
            <CreateVirtualHouseForm
              onXChange={onXChange}
              onYChange={onYChange}
              onZChange={onZChange}
              onLengthChange={onLengthChange}
              onDepthChange={onDepthChange}
              onHeightChange={onHeightChange}
              onDescriptionChange={onDescriptionChange}
              onNameChange={onNameChange}
              onFormSubmit={onFormSubmit}
              onExitForm={onExitForm}
            />
          )}
          {virtualHouse && (
              
            <div className='container'>
              <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>Exit Virtual Room </VirtualRoomButton>
              <Canvas>
                <VirtualHouseCanvas virtualHouse={virtualHouse} createMode />
              </Canvas>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateVirtualHousePage;
