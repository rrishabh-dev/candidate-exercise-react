import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import './CreateOrEditTask.scss';

const CreateOrEditTask = ({ handleCreateTask, handleEditTask }) => {
  const params = useLocation();
  const navigate = useNavigate();
  const { id: selectedId } = useParams();
  const isEdit = params?.pathname.includes('/edit-task');
  const availableTaskList = JSON.parse(localStorage.getItem("task"));
  const getSelectedTaskData = availableTaskList.filter(({ taskId }) => taskId === selectedId);

  /*States for all the fields of the form where we can store the value given by user*/
  const [title, setTitle] = useState(getSelectedTaskData.length > 0 ? getSelectedTaskData[0].title : '');
  const [priorityLevel, setPriorityLevel] = useState(getSelectedTaskData.length > 0 ? getSelectedTaskData[0].priorityLevel : '');
  const [assignee, setAssignee] = useState(getSelectedTaskData.length > 0 ? getSelectedTaskData[0].assignee : '');
  const [status, setStatus] = useState(getSelectedTaskData.length > 0 ? getSelectedTaskData[0].status : '');
  const [description, setDescription] = useState(getSelectedTaskData.length > 0 ? getSelectedTaskData[0].description : '');

  // handler for form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // checking whether all fields are filled by user or not.
    if (!title || !priorityLevel || !assignee || !status || !description) {
      alert("All fields are mandatory, they can't be blank.");
    }
    else { // based on isEdit key calling handler for task creation or editing the task.
      if (!isEdit) handleCreateTask(title, priorityLevel, assignee, status, description);
      else handleEditTask(title, priorityLevel, assignee, status, description, selectedId);

      /*after creation or updation just clearing all the data of the form
        by resetting those state variable using their setter functions.*/
      setTitle("");
      setPriorityLevel("");
      setAssignee('');
      setStatus('');
      setDescription('');
      navigate('/');
    }
  }

  return (
    <>
      <Container fixed maxWidth="lg">
        <Card className='card-container'>
          <Box className='form-heading-container'>
            <Typography variant="h4">
              {isEdit ? 'Edit Task' : 'Create Task'}
            </Typography>
          </Box>
          <Divider />
          <Box component="form" noValidate className='form-container'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                  fullWidth
                  autoComplete="given-name"
                  placeholder="Title of task"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-level-select-label">Priority Level</InputLabel>
                  <Select
                    labelId="priority-level-select-label"
                    id="priority-level-select"
                    label="Priority Level"
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value)}
                  >
                    <MenuItem value={'Lowest'}>Lowest</MenuItem>
                    <MenuItem value={'Low'}>Low</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'High'}>High</MenuItem>
                    <MenuItem value={'Highest'}>Highest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="assignee"
                  label="Assignee"
                  name="assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  fullWidth
                  placeholder="Assignee of task"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value={'To-Do'}>To Do</MenuItem>
                    <MenuItem value={'In-Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  label="Description"
                  name='description'
                  placeholder='Description of the task'
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent='end' className='btn-container'>
              <Grid item xs={6} sm={3}>
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleFormSubmit}
                  component="label"
                  variant="contained"
                  className='submit-btn'
                >
                  {params?.pathname.includes('/edit-task') ? 'Edit' : 'Create'}
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  component="label"
                  variant="outlined"
                  className='submit-btn'
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  )
}

export default CreateOrEditTask;
