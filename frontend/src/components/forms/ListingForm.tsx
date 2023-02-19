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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const ListingForm: React.FC<ListingFormProp> = (props) => {
  const [fbxFile, setFbxFile] = useState<File | null>(null);
  const [textureFiles, setTextureFiles] = useState<FileList | null>(null);
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [developerName, setDeveloperName] = useState<string>('');

  // form inputs

  useEffect(() => {
    props.updateBuildingCanvasPreview(rawBuildingDataUrl);
  }, [rawBuildingDataUrl]);

  // on file change
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    setFbxFile(e.target.files[0]);

    // read image and store the url
    const reader = new FileReader();
    reader.onload = () => {
      setRawBuildingDataUrl(reader.result as any);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onTextureFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!e.target.files) {
      return;
    }

    setTextureFiles(e.target.files);
  };

  // on form submit
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('clicked');
  };

  // print list of files onto screen
  const printTextureFiles = () => {
    // FileList type is not array, but its iterable
    // convert fileList to list of files and cast as array
    const files = textureFiles ? [...textureFiles] : [];

    if (files.length < 1) {
      return;
    }

    return (
      <div className='texture-file-list'>
        {files.map((file, index) => {
          return (
            <div key={index} className='texture-file-item'>
              <CheckBoxIcon />
              {file.name} ({Math.round(file.size / 1000)}KB)
            </div>
          );
        })}
      </div>
    );
  };

  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setDescription(e.currentTarget.value);
  };

  const onLocationChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocation(e.currentTarget.value);
  };

  const onProjectNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setProjectName(e.currentTarget.value);
  };

  const onDeveloperNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setDeveloperName(e.currentTarget.value);
  };

  // check that data is not empty before submission
  const fieldsAreValid = (): boolean => {
    if (!fbxFile || !textureFiles) {
      return false;
    }

    if (textureFiles.length === 0) {
      return false;
    }

    if (
      description.length === 0 ||
      location.length === 0 ||
      projectName.length === 0 ||
      developerName.length === 0
    ) {
      return false;
    }

    return true
  };

  // check validity after every rerebder 
  let valid = fieldsAreValid()
  return (
    <div>
      <div className='listing-form'>
        {/* TODO onsubmit */}
        <div className='listing-form-control'>
          <label className='custom-file-upload' htmlFor='buildingModelInput'>
            <img></img>
            <p>Upload FBX File</p>
            <input
              onChange={onFileChange}
              id='buildingModelInput'
              type='file'
              accept='.fbx'></input>
          </label>
        </div>
        {fbxFile && (
          <div className='texture-file-item'>
            <CheckBoxIcon />
            {fbxFile.name} ({Math.round(fbxFile.size / 1000)}KB)
          </div>
        )}
      </div>
      <div className='listing-form'>
        {/* TODO onsubmit */}
        <div className='listing-form-control'>
          <label className='custom-file-upload' htmlFor='textureInput'>
            <img></img>
            <p>Upload texture .jpg File</p>
            <input
              onChange={onTextureFileChange}
              id='textureInput'
              type='file'
              accept='.jpg'
              multiple
            />
          </label>
        </div>
        {printTextureFiles()}
      </div>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor='description'>Description</InputLabel>
          <Input
            onChange={onDescriptionChange}
            id='description'
            aria-describedby='description-text'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='location'>Location</InputLabel>
          <Input
            onChange={onLocationChange}
            id='location'
            aria-describedby='location-text'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='project-name'>Project Name</InputLabel>
          <Input
            onChange={onProjectNameChange}
            id='project-name'
            aria-describedby='project-name-text'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='developer-name'>Developer Name</InputLabel>
          <Input
            onChange={onDeveloperNameChange}
            id='developer-name'
            aria-describedby='developer-name-text'
          />
        </FormControl>
      </FormGroup>
      <Button disabled={!valid} variant='outlined' onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ListingForm;
