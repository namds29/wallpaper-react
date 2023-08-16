import "./App.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import LoginForm from "./pages/login/login-form";
import Wallpapers from "./pages/wallpaper";
import { AuthProvider } from "./shared/contexts/auth-context";
import Dashboard from "./pages/dashboard";
import Category from "./pages/category";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<Layout children={<Outlet />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/wallpaper" element={<Wallpapers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
