import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Main, Register } from "../../pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={"Loading..."}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={"Loading..."}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading..."}>
              <Main />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
