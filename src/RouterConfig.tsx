import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import App from "./App";
import PageA from "./components/PageA";
import PageB from "./components/PageB";
import Index from "./components/BookSearch/Index";

export const RouterConfig:React.VFC = () =>{
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="pageA" element={<PageA />} />
        <Route path="pageB" element={<PageB />} />
        <Route path='books' element={<Index/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
