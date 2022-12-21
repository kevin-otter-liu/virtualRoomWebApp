import React, { useEffect, useRef, useState,KeyboardEvent } from 'react';
import axios from 'axios';
import './ImageForm.css';
import Button from '../ui/Button';
import ImageFormPropI from '../../types/forms/ImageFormPropI';

const ImageForm: React.FC<ImageFormPropI> = (props) => {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState('');
  const labelRef = useRef<HTMLInputElement>(null);

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e:KeyboardEvent)=>{
    e.stopPropagation()
  }

  const onFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('description', description);
      await axios.post(`http://localhost:3000/virtual-room/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };

  const onImageInputChangeHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
  };

  const onTextInputChangeHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    setDescription(event.target.value);
  };

  return (
    <form onKeyUp={keyboardEventHandler} onKeyDown={keyboardEventHandler} className='form' onSubmit={onFormSubmitHandler}>
      <label className='custom-file-upload' htmlFor='imageInput'>
        <img></img>
        <input
          id='imageInput'
          onChange={onImageInputChangeHandler}
          type='file'
          accept='image/*'></input>
      </label>
      <input
        ref={labelRef}
        value={description}
        onChange={onTextInputChangeHandler}
        type='text'
        placeholder='description'></input>
      <Button type='submit'>Upload image</Button>
      <p className='input-text'>{`Face index selected: ${props.text}`}</p>
      <Button type='button' onClick={props.onClick}>
        Exit form
      </Button>
    </form>
  );
};

export default ImageForm;
