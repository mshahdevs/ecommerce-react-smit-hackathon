import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
function App() {
  return (
    <>
      <Router>
        <Header />

        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              {/*<Route path="/product/:id" element={<ProductDetail />} />*/}
              <Route path="/cart/:id?" element={<Cart />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
