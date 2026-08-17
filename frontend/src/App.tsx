import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export function App() {
  return (
    <PortfolioDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PortfolioDataProvider>
  );
}

export default App;

