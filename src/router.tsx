import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./shared/ScrollToTop";
import AppLayout from "./shared/AppLayout";
import ErrorBoundary from "./shared/ErrorBoundary";
import { CART_PATH, DETAIL_PATH, HOME_PATH, LIST_PATH, ODER_PATH, SEARCH_PATH ,USER_PATH,BILL_PATH, PROFILE_PATH} from "./paths";
import Home from "./pages/home";
import List from "./pages/list";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Oder from "./pages/oder";
import Search from "./pages/search";
import User from "./pages/User";
import PrivateRoute from "./shared/PrivateRoute";
import Bill from "./pages/bill";
import Profile from "./pages/profile";

const routers = createBrowserRouter([
    {
      path: '',
      element: (
        <>
          {' '}
          <ScrollToTop />
          <AppLayout />
        </>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: HOME_PATH,
          element: <Home />,
        }, 
        {
          path: LIST_PATH,
          element: <List />,
        }, 
        {
          path: CART_PATH,
          element: <Cart />,
        }, 
        {
          path: DETAIL_PATH,
          element: <Detail />,
        }, 
        {
          path: ODER_PATH,
          element: <Oder />,
        },
        {
          path: SEARCH_PATH,
          element: <Search />,
        },
        {
          path: USER_PATH,
        element: <PrivateRoute />,  // Protect the USER_PATH route
        children: [
          {
            path: USER_PATH,
            element: <User />,
          },
        ],
        },
        {
          path: BILL_PATH,
          element: <Bill />,
        },
        {
          path: PROFILE_PATH,
          element: <Profile />,
        },
      ],
    } 
  ]);
  
  export default routers;