import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import App from "./App";
import PageA from "./components/PageA";
import PageB from "./components/PageB";
import Index from "./components/BookSearch/Index";
import Photo from "./components/PhotoRanking/index";
import ApiTest from "./components/ApiCheck/index";
import RefTest from "./components/RefTest/index2";
import Canvas from "./components/Canvas/index";
import CnavasTest from "./components/CanvasDLTest/index";

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
        <Route path="api" element={<ApiTest/>}/>
        <Route path="usetest" element={<RefTest/>}/>
        <Route path="canvas" element={<Canvas/>}/>
        <Route path="canvasdl" element={<CnavasTest/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
