import React, { useEffect, useRef, useState,KeyboardEvent } from 'react';
import axios from 'axios';
import './ImageForm.css';
import Button from '../ui/Button';
import ImageFormPropI from '../../types/forms/ImageFormPropI';

const ImageForm: React.FC<ImageFormPropI> = (props) => {

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e:KeyboardEvent)=>{
    e.stopPropagation()
  }

  return (
    <form onKeyUp={keyboardEventHandler} onKeyDown={keyboardEventHandler} className='form' onSubmit={props.onFormSubmit}>
      <label className='custom-file-upload' htmlFor='imageInput'>
        <img></img>
        <input
          id='imageInput'
          onChange={props.onImageInputChange}
          type='file'
          accept='image/*'></input>
      </label>
      <input
        value={props.description}
        onChange={props.onTextInputChange}
        type='text'
        placeholder='description'></input>
      <Button type='submit'>Upload image</Button>
      <p className='input-text'>{`Face index selected: ${props.text}`}</p>
      <Button type='button' onClick={props.onExitForm}>
        Exit form
      </Button>
    </form>
  );
};

export default ImageForm;
