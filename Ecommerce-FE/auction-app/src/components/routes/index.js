import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pathConfig } from '../../constants/pathConfig';
import PrivateRoute from './PrivateRoute';
import Error from '../errors/Error';
import Home from '../../screens/Home';
import Register from '../../screens/Register'
import Login from '../../screens/Login'

export default function RootRoute() {
  const { admin, login, register, error } = pathConfig;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<PrivateRoute />}> */}
          <Route exact path="/" element={<Home />} />
        {/* </Route> */}
        <Route exact path={register.path} element={<Register />} />
        <Route exact path={login.path} element={<Login />} />

        {/* Error pages */}
        <Route path={error.forbidden} element={<Error status="403"/>} />
        <Route path={error.serverError} element={<Error status="500"/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
