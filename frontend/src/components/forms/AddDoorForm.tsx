import React, { useState, KeyboardEvent, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import './ImageForm.css';
import Button from '../ui/Button';
import AddDoorFormPropI from '../../types/forms/AddDoorFormPropI';
import { VirtualHouse } from '../../types/responses/VirtualHouse';

type DoorFormData = {
  x: string;
  y: string;
  z: string;
  length: string;
  depth: string;
  height: string;
};

const AddDoorForm: React.FC<AddDoorFormPropI> = (props) => {
  const [doorFormData, setDoorFormData] = useState<DoorFormData>({
    x: '',
    y: '',
    z: '',
    length: '',
    height: '',
    depth: '',
  });

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  // handler for the onclick event on the exit button to exit the image form
  const onExitForm = () => {
    props.onExitHandler();
  };

  // hanlder for submitting the image form
  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const res: AxiosResponse<VirtualHouse> = await axios.post(
      'http://localhost:3000/virtual-house/add-door',
      {
        virtual_room_id:props.virtual_room_id,
        virtual_wall_id:props.virtual_wall_id,
        wall_no:6,
        x: parseInt(doorFormData.x),
        y: parseInt(doorFormData.y),
        z: parseInt(doorFormData.z),
        length: parseInt(doorFormData.length),
        depth: parseInt(doorFormData.depth),
        height: parseInt(doorFormData.height),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    console.log(res.data);

    props.handlePostSubmitResponse(res.data);
    // let { image_url, image_id, face, is_door } = res.data;
    // props.handlePostSubmitResponse(
    //   props.virtual_room_id,
    //   face,
    //   is_door,
    //   image_url,
    //   image_id
    // );
  };

  // change handlers
  const onXchange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        x: event.target.value,
      };
    });
  };

  const onYchange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        y: event.target.value,
      };
    });
  };
  const onZchange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        z: event.target.value,
      };
    });
  };
  const onLengthchange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        length: event.target.value,
      };
    });
  };
  const onDepthchange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        depth: event.target.value,
      };
    });
  };
  const onHeightchange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDoorFormData((prev) => {
      return {
        ...prev,
        height: event.target.value,
      };
    });
  };

  return (
    <Fragment>
      <form
        onKeyUp={keyboardEventHandler}
        onKeyDown={keyboardEventHandler}
        className='form'
        onSubmit={onFormSubmit}>
        <div className='virtual-room-form'>
          <div> Enter details for next Room</div>
          <div>
            <label htmlFor='x'>x: </label>
            <input
              id='x'
              type='number'
              value={doorFormData.x}
              onChange={onXchange}></input>
          </div>
          <div>
            <label htmlFor='y'>y: </label>
            <input
              id='y'
              type='number'
              value={doorFormData.y}
              onChange={onYchange}></input>
          </div>
          <div>
            <label htmlFor='z'>z: </label>
            <input
              id='z'
              type='number'
              value={doorFormData.z}
              onChange={onZchange}></input>
          </div>
          <div>
            <label htmlFor='length'>length: </label>
            <input
              id='length'
              type='number'
              value={doorFormData.length}
              onChange={onLengthchange}></input>
          </div>
          <div>
            <label htmlFor='depth'>depth: </label>
            <input
              id='depth'
              type='number'
              value={doorFormData.depth}
              onChange={onDepthchange}></input>
          </div>
          <div>
            <label htmlFor='height'>height: </label>
            <input
              id='height'
              type='number'
              value={doorFormData.height}
              onChange={onHeightchange}></input>
          </div>
        </div>
        <Button type='submit'>Submit</Button>
        <Button type='button' onClick={onExitForm}>
          Exit Form
        </Button>
      </form>
    </Fragment>
  );
};

export default AddDoorForm;
