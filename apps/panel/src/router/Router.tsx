import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../screens/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
