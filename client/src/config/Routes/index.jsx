import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  AddBlog,
  DetailedBlog,
} from "../../pages";
import { Nav, Footer } from "../../components";

const AppRoutes = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading..."}>
              <Home />
            </Suspense>
          }
        />
        <Route
          // path="/detail-blog/:id"
          path="/detailed-blog"
          element={
            <Suspense fallback={"Loading..."}>
              <DetailedBlog />
            </Suspense>
          }
        />
        <Route
          // path="/create-blog/:id?"
          path="/create-blog"
          element={
            <Suspense fallback={"Loading..."}>
              <AddBlog />
            </Suspense>
          }
        />
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
