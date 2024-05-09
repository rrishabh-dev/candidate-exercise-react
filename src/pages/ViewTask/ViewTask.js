import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  TablePagination
} from '@mui/material';

import './ViewTask.scss';

// All these are styled custom components for Search bar available in this page.
const Search = styled('div')(({ theme }) => ({
  width: '50%',
  border: '1px solid',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toggleSort, setToggleSort] = useState('desc');
  const [filteredData, setFilteredData] = useState([]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // handler for sorting the data.
  const handleSort = () => {
    let sortedTask = [];

    /*If toggleSort state variable is asc then this handler will sort task data according
      to ascending order and if user again clicks on the same button then toggleSort state
      gets changed to desc and then it will sort the task data according to descending order
      and render the list on UI accordingly.*/
    if (toggleSort === 'asc') {
      sortedTask = filteredData.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
      });
      setToggleSort('desc');
    } else if (toggleSort === 'desc') {
      sortedTask = filteredData.sort((a, b) => {
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
                filteredData
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((el, index) => (
                  <Box key={index} className='task-details-full'>
                    <Box className='task-details'>
                      <Box className='task-detail-container-first'>
                        <p className='neglect-default-spacing'>
                          <strong>Task ID: </strong>
                          {el.taskId}
                        </p>
                        <h2 className='neglect-default-spacing'>
                          Tittle: {el.title}
                        </h2>
                      </Box>
                      <Box className='task-detail-container-second'>
                        <p className='neglect-default-spacing'>
                          <strong>Priority: </strong>{el.priorityLevel}
                        </p>
                        <p className='neglect-default-spacing'>
                          <strong>Status: </strong>
                          {el.status}
                        </p>
                      </Box>
                      <Box className='task-detail-container-third'>
                        <IconButton
                          edge="end"
                          size="large"
                          color="inherit"
                          onClick={() => handleDeleteTask(el)}
                          className='task-detail-container-third-icon-btn'
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          size="large"
                          color="inherit"
                          className='task-detail-container-third-icon-btn'
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
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ViewTask;
