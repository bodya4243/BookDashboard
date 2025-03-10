import './App.css'
import MainPage from "./pages/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import CreateBook from "./pages/CreateBook.tsx";
import Layout from "./layout/Layout.tsx";

function App() {

  return (
    <>
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/create-book" element={<CreateBook/>}/>
            </Routes>
        </Layout>
    </>
  )
}

export default App
