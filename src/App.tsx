import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<AddBook />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
