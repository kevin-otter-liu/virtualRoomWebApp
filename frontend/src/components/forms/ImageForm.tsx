import React, { useState, KeyboardEvent, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import './ImageForm.css';
import Button from '../ui/Button';
import ImageFormPropI from '../../types/forms/ImageFormPropI';

type ImageFormData = {
  face: null | number;
  virtual_wall_id: string | null;
  is_door: boolean;
};

const ImageForm: React.FC<ImageFormPropI> = (props) => {
  const [file, setFile] = useState<File>();

  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    face: props.face,
    virtual_wall_id: props.virtual_wall_id,
    is_door: false,
  });

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  const onIsDoorButtonClick = () => {
    // toggle door
    setImageFormData((prevState) => {
      console.log(`is door button is ${!prevState.is_door}`);
      return {
        ...prevState,
        is_door: !prevState.is_door,
      };
    });
  };

  // change event for changing the image input into the form
  const onImageInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
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
          face: imageFormData.face,
          virtual_wall_id: imageFormData.virtual_wall_id,
          is_door: imageFormData.is_door,
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

      let { image_url, image_id, face, is_door } = res.data;
      props.handlePostSubmitResponse(
        props.virtual_room_id,
        face,
        is_door,
        image_url,
        image_id
      );
    }
  };

  return (
    <Fragment>
      <form
        onKeyUp={keyboardEventHandler}
        onKeyDown={keyboardEventHandler}
        className='form'
        onSubmit={onFormSubmit}>
        <label className='custom-file-upload' htmlFor='imageInput'>
          <img></img>
          <input
            id='imageInput'
            onChange={onImageInputChange}
            type='file'
            accept='image/*'></input>
        </label>
        <Button type='button' onClick={onIsDoorButtonClick}>
          is door
        </Button>
        <Button type='submit'>Upload image</Button>
        <Button type='button' onClick={onExitForm}>
          Exit form
        </Button>
        <div className='break'></div>
      </form>
    </Fragment>
  );
};

export default ImageForm;
