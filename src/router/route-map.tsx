import React from "react";
import Home from "pages/home";
import PetsNearMe from "pages/pets-near-me";
import SignIn from "pages/sign-in";
import SignUp from "pages/sign-up";
import MyPets from "pages/my-pets";
import Report from "pages/reports";
import ModifyPet from "pages/reports/ModifyPet";
import Profile from "pages/profile/index";
import Edith from "pages/profile/edith-profile";
import EdithAuth from "pages/profile/edit-auth";
import Auth from "pages/sign-up/sign-auth";

type Routes =
  | "HOME"
  | "SIGN_UP"
  | "FIND_PETS"
  | "AUTH"
  | "SIGN_IN"
  | "PROFILE"
  | "EDIT"
  | "EDIT_AUTH"
  | "MY_PETS"
  | "REPORT"
  | "MODIFY";

type Route = {
  path: string;
  component: React.FC;
};

type RouteMap = Record<Routes, Route>;

const routeMap: RouteMap = {
  HOME: {
    path: "/home",
    component: <Home />,
  },
  FIND_PETS: {
    path: "/search",
    component: <PetsNearMe />,
  },
  SIGN_UP: {
    path: "sign-up",
    component: <SignUp />,
  },
  AUTH: {
    path: "sign-up/auth",
    component: <Auth />,
  },
  SIGN_IN: {
    path: "sign-in",
    component: <SignIn />,
  },
  PROFILE: {
    path: "profile",
    component: <Profile />,
  },
  EDIT: {
    path: "profile/edit",
    component: <Edith />,
  },
  EDIT_AUTH: {
    path: "profile/auth",
    component: <EdithAuth />,
  },
  MY_PETS: {
    path: "my-pets",
    component: <MyPets />,
  },
  REPORT: {
    path: "report",
    component: <Report />,
  },
  MODIFY: {
    path: "report/modify/:petId",
    component: <ModifyPet />,
  },
};

export default routeMap;
