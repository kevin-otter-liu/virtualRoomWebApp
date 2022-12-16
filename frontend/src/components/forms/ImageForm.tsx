import ImageFormPropI from '../../types/forms/ImageFormPropI';
import React,{useState} from 'react';
import axios from 'axios';

const ImageForm: React.FC = () => {
  const [file,setFile] = useState<File>();
  const [description,setDescription] = useState("")

  const onFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if(file){
      const formData = new FormData()
      formData.append("image",file)
      formData.append("description",description)
      await axios.post("http://localhost:3000/virtual-room/image",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
    }
  }

  const onImageInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {

    if(!event.target.files){
      return
    }
    setFile(event.target.files[0]);

  }

  const onTextInputChangeHandler:  React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    setDescription(event.target.value);
  }


  return (<form onSubmit={onFormSubmitHandler}>
    <input onChange={onImageInputChangeHandler} type='file' accept='image/*'></input>
    <input value={description} onChange={onTextInputChangeHandler} type='text' placeholder='description'></input>
    <button type='submit'>Submit</button>
  </form>)
};

export default ImageForm;

