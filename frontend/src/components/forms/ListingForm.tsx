import './ListingForm.css';
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import ListingFormProp from '../../types/forms/ListingFormProp';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ax from 'axios';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Material, Mesh } from 'three';
import { useNavigate } from 'react-router-dom';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

// const findMaterials = (url: string) => {
//   const fbxLoader = new FBXLoader();
//   // const fbx = useLoader(FBXLoader, props.url);
//   let materialsDetected: Array<[string, Material]> = [];

//   fbxLoader.load(url, (fbx) => {
//     let meshes: Mesh[] = [];
//     fbx.traverse((child) => {
//       if (child instanceof Mesh) {
//         meshes.push(child);
//         // let materials: Material[] = child.material;
//         // materials.forEach((material) => {
//         //   materialsDetected.push([material.name, material]);
//         //   // child.material[0].map = texture;
//         // });
//       }
//     });
//     let materials = {};
//     for (let i = 0; i < meshes.length; i++) {
//       let mesh = meshes[i];
//       let material = mesh.material;
//       if (material.name !== '') {
//         materials[material.name] = material;
//       }
//     }

//     let textures = {};
//     for (let i = 0; i < meshes.length; i++) {
//       let mesh = meshes[i];
//       let material = mesh.material;
//       if (material.map !== null) {
//         let texture = material.map;
//         textures[texture.name] = texture;
//       }
//     }

//     // console.log(`mesh: ${JSON.stringify(meshes)}`);
//     console.log(`fbx: ${JSON.stringify(fbx.toJSON()['materials'])}`);

//     console.log(`materials: ${JSON.stringify(materials)}`);
//     console.log(`textures: ${JSON.stringify(textures)}`);
//   });

//   return materialsDetected;
// };

const ListingForm: React.FC<ListingFormProp> = (props) => {
  const [fbxFile, setFbxFile] = useState<File | null>(null);
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [completionDate, setCompletionDate] = useState<string>('');

  // texture maps : textureimage name -> texture url
  const [textureFilePaths, setTextureFilePaths] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const [listingThumbnailFile, setListingThumbnailFile] = useState<File | null>(
    null
  );
  const [listingThumbnailFileURL, setListingThumbnailFileURL] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  // form inputs

  useEffect(() => {
    props.updateBuildingCanvasPreview(rawBuildingDataUrl,textureFilePaths);
  }, [rawBuildingDataUrl,textureFilePaths]);

  // on fbx file form change
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    setFbxFile(e.target.files[0]);

    // read image and store the url
    const reader = new FileReader();
    reader.onload = () => {
      setRawBuildingDataUrl(reader.result as string);
      // findMaterials(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // on texture file changes
  const onTextureFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    // read images from buffer and get object URL
    let files = [...e.target.files];

    // texture map
    let map = new Map<string, string>();
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        map.set(file.name, reader.result as string);
      };
    });
    console.log(map);
    setTextureFilePaths(map);
  };

  // on image thumbnail form change
  const onImageThumbnailFormChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (!e.currentTarget.files || e.currentTarget.files.length < 1) {
      return;
    }
    setListingThumbnailFile(e.currentTarget.files[0]);

    let reader = new FileReader();
    reader.onload = () => {
      setListingThumbnailFileURL(reader.result as string);
    };
    reader.readAsDataURL(e.currentTarget.files[0]);
  };

  // on form submit
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const formData = new FormData();

    // sanity checks
    if (!fbxFile || !listingThumbnailFile) {
      console.log('empty files');
      return;
    }

    // creating form data to send

    // attaching file data
    formData.append('building', fbxFile);
    formData.append('thumbnail', listingThumbnailFile);

    // attaching form text data in json
    formData.append(
      'data',
      JSON.stringify({
        description: description,
        location: location,
        project_name: projectName,
        contact_email: contactEmail,
        completion_date: completionDate,
      })
    );
    let res = await axios.post('/api/listing/create', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (res.status != 200) {
      console.log('error');
      return;
    }

    navigate('/my-listings');
    console.log(res);
  };

  // stop keyboard events from propagating on canvas when forms are focused
  const stopCanvasProp: React.KeyboardEventHandler = (e) => [
    e.stopPropagation(),
  ];

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

  const onContactEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setContactEmail(e.currentTarget.value);
  };

  const onCompletionDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setCompletionDate(e.currentTarget.value);
  };

  // check that data is not empty before submission
  const fieldsAreValid = (): boolean => {
    if (!fbxFile || !listingThumbnailFile) {
      return false;
    }

    if (
      description.length === 0 ||
      location.length === 0 ||
      projectName.length === 0 ||
      completionDate.length === 0
    ) {
      return false;
    }

    return true;
  };

  // check validity after every rerebder
  let valid = fieldsAreValid();
  return (
    <div className='listing-form'>
      <div>
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
        <div className='listing-form-control'>
          <label className='custom-file-upload' htmlFor='buildingTextureInput'>
            <img></img>
            <p>Upload Texture files</p>
            <input
              multiple
              onChange={onTextureFileChange}
              id='buildingTextureInput'
              type='file'
              accept='image/*'></input>
          </label>
        </div>
        <Suspense fallback={<div>falling back</div>}>
          {[...textureFilePaths.keys()].length > 0 &&
            [...textureFilePaths.keys()].map((texture, i) => {
              return (
                <div key={i} className='texture-file-item'>
                  <CheckBoxIcon />
                  {texture}
                </div>
              );
            })}
        </Suspense>
      </div>
      <div>
        {/* TODO onsubmit */}
        <div className='listing-form-control'>
          <label className='custom-file-upload' htmlFor='thumbnailInput'>
            <img></img>
            <p>Upload a thumbnail</p>
            <input
              onChange={onImageThumbnailFormChange}
              id='thumbnailInput'
              type='file'
              accept='image/* '></input>
          </label>
          {listingThumbnailFileURL && (
            <img
              className='thumbnail-img-preview'
              src={listingThumbnailFileURL}
            />
          )}
        </div>
      </div>
      <FormGroup sx={{ gap: '10px' }}>
        <TextField
          placeholder='Project Description'
          onKeyUp={stopCanvasProp}
          onKeyDown={stopCanvasProp}
          onChange={onDescriptionChange}
          multiline={true}
          rows={10}
          id='description'
          type='text'
        />
        <FormControl>
          <InputLabel htmlFor='location'>Project Location</InputLabel>
          <Input
            onKeyUp={stopCanvasProp}
            onKeyDown={stopCanvasProp}
            onChange={onLocationChange}
            id='location'
            aria-describedby='location-text'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='project-name'>Project Name</InputLabel>
          <Input
            onKeyUp={stopCanvasProp}
            onKeyDown={stopCanvasProp}
            onChange={onProjectNameChange}
            id='project-name'
            aria-describedby='project-name-text'
          />
        </FormControl>
        <InputLabel sx={{ display: 'flex' }} htmlFor='completion-date'>
          Completion Date
        </InputLabel>
        <TextField
          onChange={onCompletionDateChange}
          defaultValue={new Date().toString()}
          id='completion-date'
          type='date'
        />

        <FormControl>
          <InputLabel htmlFor='developer-name'>Contact Email</InputLabel>
          <Input
            onKeyUp={stopCanvasProp}
            onKeyDown={stopCanvasProp}
            onChange={onContactEmailChange}
            id='contact-email'
            aria-describedby='contact-email-text'
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
