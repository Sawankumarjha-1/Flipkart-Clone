import { motion, useScroll } from "framer-motion";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import "./style.scss";
import "./responsive.scss";
import NavigationBar from "./components/sub-components/NavigationBar";
import Footer from "./components/sub-components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

import AddToCart from "./components/AddToCart";
import Order from "./components/Order";
import OrderStatus from "./components/OrderStatus";
import ViewProduct from "./components/ViewProduct";
import Result from "./components/Result";
import PageNotFound from "./components/sub-components/PageNotFound";
import CompanyIndividualResult from "../src/components/CompanyIndividualResult.jsx";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <BrowserRouter>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/searchitem" element={<Result />}></Route>
        <Route path="/cart" element={<AddToCart />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/status" element={<OrderStatus />}></Route>
        <Route path="/individualsearchitem" element={<ViewProduct />}></Route>
        <Route
          path="/categorysearchitem"
          element={<CompanyIndividualResult />}
        ></Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
