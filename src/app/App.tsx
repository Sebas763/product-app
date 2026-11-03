import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../features/shared/layout/Layout";
import Products from "../features/products/pages/Products";
import ProductDetail from "../features/products/pages/ProductDetail";
import CreateProduct from "../features/products/pages/CreateProduct";
import Users from "../features/users/pages/Users";
import UserDetail from "../features/users/pages/UserDetail";
import CreateUser from "../features/users/pages/CreateUser";
import NotFound from "../features/shared/components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetail />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
