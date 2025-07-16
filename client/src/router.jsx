import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoadingScreen from "./components/ui/LoadingScreen/LoadingScreen.jsx";
import PrivateRoute from "./components/layout/PrivateRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const EventDetails = lazy(() => import("./pages/event-details.jsx"));
const CreateEvent = lazy(() => import("./pages/create-event.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Register = lazy(() => import("./pages/register.jsx"));
const UserDashboard = lazy(() => import("./pages/dashboard.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));
const DefaultLayout = lazy(() =>
  import("./components/layout/DefaultLayout.jsx")
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
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

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/events/:eid"
              element={
                <PrivateRoute>
                  <EventDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/:username"
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
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
