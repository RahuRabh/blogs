import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import ProtectedRoutes from "../src/ProtectedRoutes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/acount" element={<ProtectedRoutes Component={Account} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
