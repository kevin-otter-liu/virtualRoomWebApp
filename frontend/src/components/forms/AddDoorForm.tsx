import React, { useState, KeyboardEvent, Fragment } from 'react';
import ax, { AxiosResponse } from 'axios';
import './AddDoorForm.css';
import Button from '../ui/Button';
import AddDoorFormPropI from '../../types/forms/AddDoorFormPropI';
import { VirtualHouse } from '../../types/responses/VirtualHouse';

const axios = ax.create({
  baseURL:'http://'+import.meta.env.VITE_API_HOST,
})

type DoorFormData = {
  length: string;
  depth: string;
  height: string;
};

type Validity = {
  length: boolean;
  depth: boolean;
  height: boolean;
};

const AddDoorForm: React.FC<AddDoorFormPropI> = (props) => {
  const [doorFormData, setDoorFormData] = useState<DoorFormData>({
    length: '',
    height: '',
    depth: '',
  });

  const [validity, setValidity] = useState<Validity>({
    length: false,
    depth: false,
    height: false,
  });

  // if form is not valid, disables the submit button
  const formValid: boolean =
    validity.length && validity.depth && validity.height;

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  // handler for the onclick event on the exit button to exit the image form
  const onExitForm = () => {
    props.onExitHandler();
  };

  // change handlers
  const onLengthChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (parseInt(event.target.value) <= 0 || event.target.value == '') {
      setValidity((prev) => {
        return {
          ...prev,
          length: false,
        };
      });
    } else {
      setValidity((prev) => {
        return {
          ...prev,
          length: true,
        };
      });
    }
    setDoorFormData((prev) => {
      return {
        ...prev,
        length: event.target.value,
      };
    });
  };
  const onDepthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (parseInt(event.target.value) <= 0 || event.target.value == '') {
      setValidity((prev) => {
        return {
          ...prev,
          depth: false,
        };
      });
    } else {
      setValidity((prev) => {
        return {
          ...prev,
          depth: true,
        };
      });
    }
    setDoorFormData((prev) => {
      return {
        ...prev,
        depth: event.target.value,
      };
    });
  };
  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (parseInt(event.target.value) <= 0 || event.target.value == '') {
      setValidity((prev) => {
        return {
          ...prev,
          height: false,
        };
      });
    } else {
      setValidity((prev) => {
        return {
          ...prev,
          height: true,
        };
      });
    }
    setDoorFormData((prev) => {
      return {
        ...prev,
        height: event.target.value,
      };
    });
  };

  // hanlder for submitting the image form
  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const res: AxiosResponse<VirtualHouse> = await axios.post(
      `/api/virtual-house/add-door`,
      {
        virtual_room_id: props.virtual_room_id,
        virtual_wall_id: props.virtual_wall_id,
        wall_no: 6,
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
    resetForm();
    props.handlePostSubmitResponse(res.data);
    props.onExitHandler();
  };

  // helper for reseting form state
  const resetForm = () => {
    console.log('resetForm called');
    setDoorFormData({
      length: '',
      height: '',
      depth: '',
    });
    setValidity({
      length: false,
      depth: false,
      height: false,
    });
  };

  return (
    <Fragment>
      <form
        onKeyUp={keyboardEventHandler}
        onKeyDown={keyboardEventHandler}
        onSubmit={onFormSubmit}
        className='add-door-form'>
        <div className='virtual-room-form'>
          <div> Enter details for next Room</div>
        </div>
        <div>
          <label htmlFor='length'>length: </label>
          <input
            id='length'
            type='number'
            value={doorFormData.length}
            onChange={onLengthChange}></input>
        </div>
        <div>
          <label htmlFor='depth'>depth: </label>
          <input
            id='depth'
            type='number'
            value={doorFormData.depth}
            onChange={onDepthChange}></input>
        </div>
        <div>
          <label htmlFor='height'>height: </label>
          <input
            id='height'
            type='number'
            value={doorFormData.height}
            onChange={onHeightChange}></input>
        </div>
        <Button type='submit' disabled={!formValid}>
          Submit
        </Button>
        <Button type='button' onClick={onExitForm}>
          Exit Form
        </Button>
      </form>
    </Fragment>
  );
};

export default AddDoorForm;
