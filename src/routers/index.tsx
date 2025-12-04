import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../views/home/Home';
import About from '../views/about/About';
import Settings from '../views/settings/Settings';
import Login from '../views/login/Login';
import VideoClip from '../views/video-clip/VideoClip';
import Image from '../views/material/image/Image'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'material/image',
        element: <Image />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/video-clip',
    element: <VideoClip />,
  }
]);

export default router;
//   return <RouterProvider router={router} />;
// };