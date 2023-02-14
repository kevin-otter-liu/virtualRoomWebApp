import './ListingForm.css';
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import ListingFormProp from '../../types/forms/ListingFormProp';

const ListingForm: React.FC<ListingFormProp> = (props) => {
  const [file, setFile] = useState<File>();
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');

  useEffect(() => {
    props.updateBuildingCanvasPreview(rawBuildingDataUrl);
  }, [rawBuildingDataUrl]);

  // on file change
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);

    // read image and store the url
    const reader = new FileReader();
    reader.onload = () => {
      setRawBuildingDataUrl(reader.result as any);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // on form submit
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('clicked');
  };

  return (
    <div>
      <form className='listing-form'></form>
      {/* TODO onsubmit */}
      <form onSubmit={onSubmit}>
        <FormGroup>
          <div className='listing-form-control'>
            <label className='custom-file-upload' htmlFor='buildingModelInput'>
              <img></img>
              <div>Upload File</div>
              <input
                onChange={onFileChange}
                id='buildingModelInput'
                type='file'
                accept='.fbx'></input>
            </label>
          </div>
          <FormControl>
            <InputLabel htmlFor='description'>Description</InputLabel>
            <Input id='description' aria-describedby='description-text' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='location'>Location</InputLabel>
            <Input id='location' aria-describedby='location-text' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='project-name'>Project Name</InputLabel>
            <Input id='project-name' aria-describedby='project-name-text' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='developer-name'>Developer Name</InputLabel>
            <Input id='developer-name' aria-describedby='developer-name-text' />
          </FormControl>
          <Button type='submit'>Submit</Button>
        </FormGroup>
      </form>
    </div>
  );
};

export default ListingForm;
