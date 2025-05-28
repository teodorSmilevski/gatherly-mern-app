import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoadingScreen from "./components/ui/LoadingScreen/LoadingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const Home = lazy(() => import("./pages/home.jsx"));
const EventDetails = lazy(() => import("./pages/event-details.jsx"));
const CreateEvent = lazy(() => import("./pages/create-event.jsx"));
const EditEvent = lazy(() => import("./pages/edit-event.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Register = lazy(() => import("./pages/register.jsx"));
const UserDashboard = lazy(() => import("./pages/dashboard.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PrivateRoute onlyNotAuth>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute onlyNotAuth>
                <Register />
              </PrivateRoute>
            }
          />

          <Route
            path="/events/:eid"
            element={
              <PrivateRoute>
                <EventDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/events/new"
            element={
              <PrivateRoute roles={["creator"]}>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:eid/edit"
            element={
              <PrivateRoute roles={["creator", "admin"]}>
                <EditEvent />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
