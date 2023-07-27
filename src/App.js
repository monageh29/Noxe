import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./component/Layout/Layout";
import Register from "./component/Register/Register";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import jwtDecode from "jwt-decode";
import NotFound from "./component/NotFound/NotFound";
import Movies from "./component/Movies/Movies";
import People from "./component/People/People";
import MovieDetails from "./component/MovieDetails/MovieDetails";
import Tvshow from "./component/Tvshow/Tvshow";
import { useState, useEffect } from "react";
import Mediacontextprovider from "./Context/Mediacontext";
 import {Offline} from"react-detect-offline"
function App() {
  let [user, setUser] = useState(null);




  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      userData();
    }
  }, []);
  
  let userData = () => {
    let encoded = localStorage.getItem("token");
    let decoded = jwtDecode(encoded);
    console.log(decoded);
    setUser(decoded);
  };
  let logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  let Protect = ({ children }) => {
    if (localStorage.getItem("token") === null) {
      return <Navigate to="/Login" />;
    } else {
      return children;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={user} logOut={logOut} />,
      children: [
        { path: "register", element: <Register /> },
        { path: "Login", element: <Login currentUser={userData} /> },
        {
          index: true,
          element: (
            <Protect>
              <Home />
            </Protect>
          ),
        },

        {
          path: "Moveis",
          element: (
            <Protect>
              <Movies />
            </Protect>
          ),
        },
        {
          path: "People",
          element: (
            <Protect>
              <People />
            </Protect>
          ),
        },

        {
          path: "Tvshow",
          element: (
            <Protect>
              <Tvshow />
            </Protect>
          ),
        },

        {
          path: "MovieDetails/:id/:mediatype",
          element: (
            <Protect>
              <MovieDetails />
            </Protect>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>

   

      <Offline>        <div className="offline fa-bold"> you are offline</div>
</Offline>
      <Mediacontextprovider>
        <RouterProvider router={router} />
      </Mediacontextprovider>
    </>
  );
}

export default App;
