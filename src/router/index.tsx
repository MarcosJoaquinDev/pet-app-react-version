import React from "react";
import { createBrowserRouter } from "react-router-dom";
import routeMap from "router/route-map";
import AuthLayout from "components/layout/Auth";
import HomeLayout from "components/layout/Home";
import MainLayout from "components/layout/Main";

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: routeMap.HOME.component,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: routeMap.SIGN_UP.path,
        element: routeMap.SIGN_UP.component,
      },
      {
        path: routeMap.AUTH.path,
        element: routeMap.AUTH.component,
      },
      {
        path: routeMap.SIGN_IN.path,
        element: routeMap.SIGN_IN.component,
      },
      {
        path: routeMap.FIND_PETS.path,
        element: routeMap.FIND_PETS.component,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: routeMap.HOME.path,
        element: routeMap.HOME.component,
      },
      {
        path: routeMap.MY_PETS.path,
        element: routeMap.MY_PETS.component,
      },
      {
        path: routeMap.REPORT.path,
        element: routeMap.REPORT.component,
      },
      {
        path: routeMap.MODIFY.path,
        element: routeMap.MODIFY.component,
      },
      {
        path: routeMap.PROFILE.path,
        element: routeMap.PROFILE.component,
      },
      {
        path: routeMap.EDIT.path,
        element: routeMap.EDIT.component,
      },
      {
        path: routeMap.EDIT_AUTH.path,
        element: routeMap.EDIT_AUTH.component,
      },
    ],
  },
]);
export default router;
