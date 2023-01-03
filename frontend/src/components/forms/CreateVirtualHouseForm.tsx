import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import axios from 'axios';
import Button from '../ui/Button';
import CreateVirtualHouseFormPropI from '../../types/forms/CreateVirtualHouseForm';
import './CreateVirtualHouseForm.css';

const CreateVirtualHouseForm: React.FC<CreateVirtualHouseFormPropI> = (
  props
) => {

  return (
    <form className='create-virtual-house-form' onSubmit={props.onFormSubmit}>
      <div>Enter details to create a virtual house</div>

      <div>
        <label htmlFor='name'>input house name position</label>
        <input
          type='text'
          id='name'
          onChange={props.onNameChange}
          placeholder='Virtual House name'></input>
      </div>

      <div>
        <label htmlFor='description'>input house description</label>
        <input
          id='description'
          onChange={props.onDescriptionChange}
          type='text'
          placeholder='description'></input>
      </div>

      <div>
        <label htmlFor='x'>input x position</label>
        <input
          id='x'
          onChange={props.onXChange}
          type='number'
          placeholder='0'></input>
      </div>
      <div>
        <label htmlFor='y'>input y position</label>
        <input
          id='y'
          onChange={props.onYChange}
          type='number'
          placeholder='0'></input>
      </div>

      <div>
        <label htmlFor='z'>input z position</label>
        <input
          id='z'
          onChange={props.onZChange}
          type='number'
          placeholder='0'></input>
      </div>
      <div>
        <label htmlFor='length'>input length position</label>
        <input
          id='length'
          onChange={props.onLengthChange}
          type='number'
          placeholder='5'></input>
      </div>
      <div>
        <label htmlFor='depth'>input depth position</label>
        <input
          onChange={props.onDepthChange}
          type='number'
          placeholder='5'></input>
      </div>
      <div>
        <label htmlFor='height'>input height position</label>
        <input
          onChange={props.onHeightChange}
          type='number'
          placeholder='5'></input>
      </div>

      <Button type='submit'>Create Virtual House</Button>
      <Button type='button' onClick={props.onExitForm}>
        Exit form
      </Button>
    </form>
  );
};

export default CreateVirtualHouseForm;
