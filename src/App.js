import { v4 as uuidv4 } from 'uuid';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ProtectedRoutes from './layout/ProtectedRoutes';

const Login = lazy(() => import('./component/Login/Login'));
const Header = lazy(() => import('./component/Header/Header'));
const Footer = lazy(() => import('./component/Footer/Footer'));
const Signup = lazy(() => import('./component/Signup/Signup'));
const ViewTask = lazy(() => import('./pages/ViewTask/ViewTask'));
const CreateOrEditTask = lazy(() => import('./pages/CreateOrEditTask/CreateOrEditTask'));

const App = () => {
  /*Here we're checking that whether "task" key is available in localStorage or not.
    If its not there we're assigning an empty array to initialTasks or else we're assigning all the available tasks into initialTasks array.*/
  let initialTasks;
  if (localStorage.getItem("task") === null) initialTasks = [];
  else initialTasks = JSON.parse(localStorage.getItem("task"));

  const [task, setTask] = useState(initialTasks); // state variable for our task data.
  const [searchText, setSearchText] = useState(''); //state variable for the text by which we're searching our task.

  /*Whenever task state will change this useEffect will trigger itself and it will set the task array in localStorage.*/
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  // handle for task creation.
  const handleCreateTask = (title, priorityLevel, assignee, status, description) => {
    let taskId = uuidv4(); // assigning a new unique id for each object.
    /*Maintaining an object and assigning the values entered by user to the keys of an object as their value.*/
    const newTask = {
      taskId: taskId,
      title: title,
      priorityLevel: priorityLevel,
      assignee: assignee,
      status: status,
      description: description
    };
    /*Updating the state with newly maintained object with all the info added by user.*/
    setTask([...task, newTask]);
  }

  // handle for task deletion.
  const handleDeleteTask = (selectedTask) => {
    setTask(task.filter((e) => e !== selectedTask));
    localStorage.setItem("task", JSON.stringify(task));
  }

  // handle for edit the task.
  const handleEditTask = (title, priorityLevel, assignee, status, description, selectedId) => {
    /*Finding the index of an array for which we need to update the data.*/
    const index = task.findIndex(el => el.taskId === selectedId);

    /*Assigning all the previous data to the updatedTask variable and then reassigning the updated
      info for that object which user has changed with the help of index which we calculated above.*/
    const updatedTask = [...task];
    updatedTask[index].title = title;
    updatedTask[index].priorityLevel = priorityLevel;
    updatedTask[index].assignee = assignee;
    updatedTask[index].status = status;
    updatedTask[index].description = description;
    setTask(updatedTask);
    localStorage.setItem("task", JSON.stringify(task));
  }

  // handle for searching the task.
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Signup />} />

            {/* Protected Routes */}
            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='/' element={
                <>
                  <Header />
                  <ViewTask
                    task={task}
                    searchText={searchText}
                    handleSearch={handleSearch}
                    handleDeleteTask={handleDeleteTask}
                  />
                  <Footer />
                </>
              }/>
            </Route>

            <Route path='/create-task' element={<ProtectedRoutes />}>
              <Route path='/create-task' element={
                <>
                  <Header />
                  <CreateOrEditTask handleCreateTask={handleCreateTask} />
                  <Footer />
                </>
              }/>
            </Route>

            <Route path='/edit-task/:id' element={<ProtectedRoutes />}>
              <Route path='/edit-task/:id' element={
                <>
                  <Header />
                  <><CreateOrEditTask handleEditTask={handleEditTask} /></>
                  <Footer />
                </>
              }/>
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  )
}

export default App;
