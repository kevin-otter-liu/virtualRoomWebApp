import React, { useState, KeyboardEvent, Fragment, useEffect, useRef } from 'react';
import ax, { AxiosResponse } from 'axios';
import './ImageForm.css';
import Button from '../ui/Button';
import ImageFormPropI from '../../types/forms/ImageFormPropI';
import { VirtualHouse } from '../../types/responses/VirtualHouse';
import Cropper from 'react-cropper';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

type ImageFormData = {
  face: number;
  virtual_wall_id: string;
  virtual_room_id: string;
  is_door: boolean;
};

const ImageForm: React.FC<ImageFormPropI> = (props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [imgPreview, setImgPreview] = useState<undefined | string>(undefined);
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState<Cropper>();

  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    face: props.face,
    virtual_wall_id: props.virtual_wall_id,
    virtual_room_id: props.virtual_room_id,
    is_door: false,
  });

  useEffect(() => {
    if (!file) {
      setImgPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImgPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // stops any key events from propagating while in the form
  const keyboardEventHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  // change event for changing the image input into the form
  const onImageInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);

    // read image and store the url
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  // get image data to crop
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  // handler for the onclick event on the exit button to exit the image form
  const onExitForm = () => {
    props.onExitHandler();
  };

  // helper function
  const resetForm = () => {
    setImageFormData({
      face: props.face,
      virtual_wall_id: props.virtual_wall_id,
      virtual_room_id: props.virtual_room_id,
      is_door: false,
    });
    setFile(undefined);
    setImgPreview(undefined);
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
          virtual_room_id: imageFormData.virtual_room_id,
          is_door: imageFormData.is_door,
        })
      );

      const res: AxiosResponse<VirtualHouse> = await axios.post(
        `/api/virtual-house/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      resetForm();
      props.handlePostSubmitResponse(res.data);
      props.onExitHandler();
    }
  };

  return (
    <Fragment>
      <Cropper
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={1}
        preview='.img-preview'
        src={image}
        ref={imageRef}
        viewMode={1}
        guides={true}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
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
        {file && (
          <div className='image-preview'>
            <img src={imgPreview} />
            <p>{file.name}</p>
            <p>({Math.round(file.size / 1000)} KB)</p>
          </div>
        )}
        <Button type='submit' disabled={!file}>
          Upload image
        </Button>
        <Button type='button' onClick={onExitForm}>
          Exit form
        </Button>
        <div className='break'></div>
      </form>
    </Fragment>
  );
};

export default ImageForm;
