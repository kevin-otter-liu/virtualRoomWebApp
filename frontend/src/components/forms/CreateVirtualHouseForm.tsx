import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Button from '../ui/Button';
import CreateVirtualHouseFormPropI from '../../types/forms/CreateVirtualHouseForm';
import './CreateVirtualHouseForm.css';
type FormValidity = {
  description: boolean;
  virtualHouseName: boolean;
  length: boolean;
  depth: boolean;
  height: boolean;
};

const CreateVirtualHouseForm: React.FC<CreateVirtualHouseFormPropI> = (
  props
) => {
  const [description, setDescription] = useState<string>('');
  const [virtualHouseName, setVirtualHouseName] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [formValidity, setFormValidity] = useState<FormValidity>({
    description: false,
    virtualHouseName: false,
    length: false,
    depth: false,
    height: false,
  });

  const [showForm, setShowForm] = useState<boolean>(false);
  type InputStyle = {
    valid: { backgroundColor: '#b0f7d0' };
    invalid: { backgroundColor: '#e34f4f' };
  };

  const formValid =
    formValidity.description &&
    formValidity.virtualHouseName &&
    formValidity.length &&
    formValidity.depth &&
    formValidity.height;

  // handlers
  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '') {
      console.log('here');

      setFormValidity((prev) => {
        return {
          ...prev,
          description: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          description: true,
        };
      });
    }
    setDescription(event.target.value);
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value == '') {
      setFormValidity((prev) => {
        return {
          ...prev,
          virtualHouseName: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          virtualHouseName: true,
        };
      });
    }
    setVirtualHouseName(event.target.value);
  };

  const onLengthChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          length: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          length: true,
        };
      });
    }
    setLength(event.target.value);
  };

  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          height: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          height: true,
        };
      });
    }
    setHeight(event.target.value);
  };
  const onDepthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          depth: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          depth: true,
        };
      });
    }
    setDepth(event.target.value);
  };

  // submit handler
  const onFormSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const virtualHouseResponse = await axios.post(
      'http://localhost:3000/virtual-house/create',
      {
        name: virtualHouseName,
        description: description,
        wall_no: 6,
        x: 0,
        y: 0,
        z: 0,
        length: parseInt(length),
        height: parseInt(height),
        depth: parseInt(depth),
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );

    props.handlePostSubmit(virtualHouseResponse.data.virtual_house);
    setShowForm(false);
  };

  const onExitForm = () => {
    setShowForm(false);
  };

  const onClick = () => {
    setShowForm(true);
  };

  return (
    <Fragment>
      <Button type='button' onClick={onClick}>
        Create a new VirtualHouse
      </Button>
      {showForm && (
        <form className='create-virtual-house-form' onSubmit={onFormSubmit}>
          <div>Enter details to create a virtual house</div>

          <div>
            <label htmlFor='name'>input house name </label>
            <input
              type='text'
              id='name'
              onChange={onNameChange}
              style={
                !formValidity.virtualHouseName
                  ? { backgroundColor: '#e34f4f' }
                  : { backgroundColor: '#b0f7d0' }
              }
              placeholder='Virtual House name'></input>
          </div>

          <div>
            <label htmlFor='description'>input house description: </label>
            <input
              id='description'
              onChange={onDescriptionChange}
              type='text'
              style={
                !formValidity.description
                  ? { backgroundColor: '#e34f4f' }
                  : { backgroundColor: '#b0f7d0' }
              }
              placeholder='description'></input>
          </div>
          <div>
            <label htmlFor='length'>input length of room: </label>
            <input
              id='length'
              style={
                !formValidity.length
                  ? { backgroundColor: '#e34f4f' }
                  : { backgroundColor: '#b0f7d0' }
              }
              onChange={onLengthChange}
              type='number'></input>
          </div>
          <div>
            <label htmlFor='depth'>input depth of room: </label>
            <input
              onChange={onDepthChange}
              type='number'
              style={
                !formValidity.depth
                  ? { backgroundColor: '#e34f4f' }
                  : { backgroundColor: '#b0f7d0' }
              }
              placeholder={`${depth}`}></input>
          </div>
          <div>
            <label htmlFor='height'>input height of room: </label>
            <input
              style={
                !formValidity.height
                  ? { backgroundColor: '#e34f4f' }
                  : { backgroundColor: '#b0f7d0' }
              }
              onChange={onHeightChange}
              type='number'
              placeholder={`${height}`}></input>
          </div>

          <Button type='submit' disabled={!formValid}>
            Create Virtual House
          </Button>
          <Button type='button' onClick={onExitForm}>
            Exit form
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default CreateVirtualHouseForm;
