import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import App from "./App";
import PageA from "./components/PageA";
import PageB from "./components/PageB";
import Index from "./components/BookSearch/Index";
import Photo from "./components/PhotoRanking/index";

export const RouterConfig:React.VFC = () =>{
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="pageA" element={<PageA />} />
        <Route path="pageB" element={<PageB />} />
        <Route path='books' element={<Index/>}/>
        <Route path="photo" element={<Photo/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
