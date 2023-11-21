import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Main, Register } from "../../pages";
import { Nav, Footer } from "../../components";

const AppRoutes = () => {
  return (
    <Router>
      <Nav />
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
          path="/signup"
          element={
            <Suspense fallback={"Loading..."}>
              <Signup />
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
      <Footer />
    </Router>
  );
};

export default AppRoutes;
