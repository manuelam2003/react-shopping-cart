import { Outlet } from "react-router-dom";

import Header from './Header'
import Footer from "./Footer";

function Layout ({cartCount}) {
    return (
        <>
            <Header cartCount={cartCount}/>
            <Outlet/>
            <Footer/>
           
        </>
    )
}

export default Layout