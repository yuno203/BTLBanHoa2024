import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./shared/ScrollToTop";
import AppLayout from "./shared/AppLayout";
import ErrorBoundary from "./shared/ErrorBoundary";
import { CART_PATH, DETAIL_PATH, HOME_PATH, LIST_PATH, ODER_PATH, SEARCH_PATH } from "./paths";
import Home from "./pages/home";
import List from "./pages/list";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Oder from "./pages/oder";
import Search from "./pages/search";


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
      ],
    } 
  ]);
  
  export default routers;