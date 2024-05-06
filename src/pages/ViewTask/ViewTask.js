import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, IconButton, InputBase } from '@mui/material';

import './ViewTask.css';

// All these are styled custom components for Search bar available in this page.
const Search = styled('div')(({ theme }) => ({
  width: '50%',
  border: '1px solid',
  position: 'relative',
  borderRadius: theme.shape.borderRadius
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  pointerEvents: 'none',
  justifyContent: 'center',
  padding: theme.spacing(0, 2)
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const ViewTask = ({ task, searchText, handleSearch, handleDeleteTask }) => {
  const navigate = useNavigate();
  const [toggleSort, setToggleSort] = useState('desc');
  const [filteredData, setFilteredData] = useState([]);

  // handler for sorting the data.
  const handleSort = () => {
    let sortedTask = [];

    /*If toggleSort state variable is asc then this handler will sort task data according
      to ascending order and if user again clicks on the same button then toggleSort state
      gets changed to desc and then it will sort the task data according to descending order
      and render the list on UI accordingly.*/
    if (toggleSort === 'asc') {
      sortedTask = task.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
      });
      setToggleSort('desc');
    } else if (toggleSort === 'desc') {
      sortedTask = task.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
      setToggleSort('asc');
    }
    setFilteredData(sortedTask);
  }

  /*This useEffect will triggered once when this component mounted in to the DOM and it will setting the task
    data in another state variable named as filteredData, it will use further for searching and sorting operations.*/
  useEffect(() => {
    setFilteredData(task);
  }, []);

  /*This useEffect will trigger when task and searchText gets changed and it will setting the task
    data as per the search variable entered by user in the filteredData state.*/
  useEffect(() => {
    let filteredTasks = [];
    if (task.length > 0) {
      filteredTasks = task.filter(el => el.taskId.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredData(filteredTasks);
  }, [task, searchText]);

  return (
    <>
      <Box className='main-heading-container'>
        <h1 className='main-heading'>
          Your Task List
        </h1>
      </Box>
      <Box className='filters-container'>
        <Box className='sort-filter-container' onClick={handleSort}>
          <strong>Sort your list by title name</strong>
          {toggleSort === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </Box>
        <Search
          value={searchText}
          onChange={(e) => handleSearch(e)}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search By Task Id..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Box>
      {
        filteredData.length > 0
          ? <Box className='task-details-main-container'>
              {
                filteredData.map((el, index) => (
                  <Box key={index} className='task-details-full'>
                    <Box className='task-details'>
                      <Box>
                        <p className='neglect-default-spacing'>
                          <strong>Task ID: </strong>
                          {el.taskId}
                        </p>
                        <h2 className='neglect-default-spacing'>
                          Tittle: {el.title}
                        </h2>
                      </Box>
                      <Box>
                        <p className='neglect-default-spacing'>
                          <strong>Priority: </strong>
                          {el.priorityLevel}
                        </p>
                        <p className='neglect-default-spacing'>
                          <strong>Status: </strong>
                          {el.status}
                        </p>
                      </Box>
                      <Box>
                        <IconButton
                          edge="end"
                          size="large"
                          color="inherit"
                          onClick={() => handleDeleteTask(el)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          size="large"
                          color="inherit"
                          onClick={() => navigate(`/edit-task/${el.taskId}`)}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box>
                      <p className='neglect-default-spacing'>
                        <strong>Description: </strong>
                        {el.description}
                      </p>
                    </Box>
                  </Box>
                ))
              }
            </Box>
          : <Box className='empty-list-container'>
              <h2>Nothing in your task list for now.</h2>
              <Button
                variant="contained"
                onClick={() => navigate('/create-task')}
              >
                Create Task
              </Button>
            </Box>
      }
    </>
  )
}

export default ViewTask;
