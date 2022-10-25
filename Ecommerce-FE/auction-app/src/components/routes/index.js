import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pathConfig } from '../../constants/pathConfig';
import PrivateRoute from './PrivateRoute';
import Error from '../errors/Error';
import Home from '../../screens/home';
import Auth from '../../screens/auth'
import PublicLayout from '../layout/Layout';

export default function RootRoute() {
  const { auth, error } = pathConfig;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PublicLayout />}>
          <Route exact path="/" element={<Home />} />
        </Route>

        <Route exact path={auth.path} element={<Auth />} />

        {/* Error pages */}
        <Route path={error.forbidden} element={<Error status="403"/>} />
        <Route path={error.serverError} element={<Error status="500"/>} />
        <Route path="*" element={<Error />} />
        
      </Routes>
    </BrowserRouter>
  );
}
