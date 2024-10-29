import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import './App.css'
import { Home } from "./pages/home";
import { GenerateContent } from "./pages/generatePage";
import { DocsPage } from "./pages/doc";
import { Layout } from "./app_components/Layout";
import {TodoPage} from "./pages/todo";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/generate" element={<GenerateContent/>} />
      <Route path="/scheduler" element={<TodoPage/>}/>
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
  
}