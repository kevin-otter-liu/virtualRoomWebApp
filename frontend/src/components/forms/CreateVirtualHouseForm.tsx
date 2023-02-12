import React, { useState, Fragment } from 'react';
import ax from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateVirtualHouseFormPropI from '../../types/forms/CreateVirtualHouseForm';
// import './CreateVirtualHouseForm.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

type FormValidity = {
  description: boolean;
  virtualHouseName: boolean;
  length: boolean;
  depth: boolean;
  height: boolean;
};

const CreateVirtualHouseForm: React.FC<CreateVirtualHouseFormPropI> = (
  props
) => {
  const [description, setDescription] = useState<string>('');
  const [virtualHouseName, setVirtualHouseName] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [formValidity, setFormValidity] = useState<FormValidity>({
    description: false,
    virtualHouseName: false,
    length: false,
    depth: false,
    height: false,
  });

  const formValid =
    formValidity.description &&
    formValidity.virtualHouseName &&
    formValidity.length &&
    formValidity.depth &&
    formValidity.height;

  // handlers
  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '') {
      setFormValidity((prev) => {
        return {
          ...prev,
          description: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          description: true,
        };
      });
    }
    setDescription(event.target.value);
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value == '') {
      setFormValidity((prev) => {
        return {
          ...prev,
          virtualHouseName: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          virtualHouseName: true,
        };
      });
    }
    setVirtualHouseName(event.target.value);
  };

  const onLengthChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          length: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          length: true,
        };
      });
    }
    setLength(event.target.value);
  };

  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          height: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          height: true,
        };
      });
    }
    setHeight(event.target.value);
  };
  const onDepthChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value == '' || parseInt(event.target.value) <= 0) {
      setFormValidity((prev) => {
        return {
          ...prev,
          depth: false,
        };
      });
    } else {
      setFormValidity((prev) => {
        return {
          ...prev,
          depth: true,
        };
      });
    }
    setDepth(event.target.value);
  };

  // submit handler
  const onFormSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const virtualHouseResponse = await axios.post(
      `/api/virtual-house/create`,
      {
        name: virtualHouseName,
        description: description,
        wall_no: 6,
        x: 0,
        y: 0,
        z: 0,
        length: parseInt(length),
        height: parseInt(height),
        depth: parseInt(depth),
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );
    resetForm();
    props.handlePostSubmit(virtualHouseResponse.data.virtual_house);
  };

  // helper function for resetting form state
  const resetForm = () => {
    setDescription('');
    setVirtualHouseName('');
    setLength('');
    setHeight('');
    setDepth('');
    setFormValidity({
      description: false,
      virtualHouseName: false,
      length: false,
      depth: false,
      height: false,
    });
  };

  return (
    <Fragment>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>Create a new VirtualHouse</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={onFormSubmit}>
              <FormGroup>
                <FormLabel>Enter details to create a virtual house</FormLabel>
                <FormControl>
                  <InputLabel htmlFor='name'>input house name: </InputLabel>
                  <Input
                    value={virtualHouseName}
                    sx={{
                      input: {
                        backgroundColor: !formValidity.virtualHouseName
                          ? '#e34f4f'
                          : '#b0f7d0',
                      },
                    }}
                    type='text'
                    id='name'
                    onChange={onNameChange}
                    aria-describedby='name-helper-text'
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor='description'></InputLabel>
                  <TextField
                    value={description}
                    sx={{
                      input: {
                        backgroundColor: !formValidity.description
                          ? '#e34f4f'
                          : '#b0f7d0',
                      },
                    }}
                    label='input house description:'
                    id='description'
                    onChange={onDescriptionChange}
                    aria-describedby='description-helper-text'
                  />
                  <FormHelperText id='description-helper-text'>
                    A brief description of the house.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor='length'>input house length: </InputLabel>
                  <Input
                    value={length}
                    style={
                      !formValidity.length
                        ? { backgroundColor: '#e34f4f' }
                        : { backgroundColor: '#b0f7d0' }
                    }
                    type='number'
                    id='length'
                    onChange={onLengthChange}
                    aria-describedby='length-helper-text'
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor='depth'>input house depth: </InputLabel>
                  <Input
                    value={depth}
                    type='number'
                    style={
                      !formValidity.depth
                        ? { backgroundColor: '#e34f4f' }
                        : { backgroundColor: '#b0f7d0' }
                    }
                    id='depth'
                    onChange={onDepthChange}
                    aria-describedby='depth-helper-text'
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor='height'>input house height: </InputLabel>
                  <Input
                    value={height}
                    style={
                      !formValidity.height
                        ? { backgroundColor: '#e34f4f' }
                        : { backgroundColor: '#b0f7d0' }
                    }
                    type='number'
                    id='height'
                    onChange={onHeightChange}
                    aria-describedby='height-helper-text'
                  />
                </FormControl>
                <Button type='submit' disabled={!formValid}>
                  Submit
                </Button>
              </FormGroup>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fragment>
  );
};

export default CreateVirtualHouseForm;
