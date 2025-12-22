import {createBrowserRouter, type RouteObject} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const routes:RouteObject[] = [
    {path:"/", element: <Home />},
    {path: '/login', element: <Login/>},
    {path: "*", element: <NotFound />}
]

const router = createBrowserRouter(routes);

export default router;
