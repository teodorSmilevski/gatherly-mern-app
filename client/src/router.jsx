import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoadingScreen from "./components/ui/LoadingScreen/LoadingScreen";
import PrivateRoute from "./components/layout/PrivateRoute";

const Home = lazy(() => import("./pages/home"));
const EventDetails = lazy(() => import("./pages/event-details"));
const CreateEvent = lazy(() => import("./pages/create-event"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const UserDashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));
const DefaultLayout = lazy(() => import("./components/layout/DefaultLayout"));

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
