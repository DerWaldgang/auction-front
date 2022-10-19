import { Route, Routes } from "react-router-dom";
import EmailVerifyPage from "./pages/EmailVerifyPage/EmailVerifyPage";
import MainPage from "./pages/MainPage/MainPage";
import OneAlphabetPage from "./pages/OneAlphabetPage/OneAlphabetPage";
import OneAuction from "./pages/OneAuction/OneAuction";
import Products from "./pages/Products/Products";
import Alphabet from "./pages/Alphabet/Alphabet";
import About from "./pages/About/About";
import UserProfile from "./pages/userProfile/userProfile";


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='user/:id/verify/:token' element={<EmailVerifyPage />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/category/:id' element={<Products/>} />
        <Route path="/oneAuction/:id" element={<OneAuction />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/alphabet/:id" element={<OneAlphabetPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;