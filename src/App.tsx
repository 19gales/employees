import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import AddUser from './components/users/add-user';
import EditUserForm from './components/users/edit-user';
import UsersTable from './components/users/users-table';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< UsersTable/>}></Route>
          <Route path="/edit/:id" element={<EditUserForm />}></Route>
          <Route path="/add" element={<AddUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
