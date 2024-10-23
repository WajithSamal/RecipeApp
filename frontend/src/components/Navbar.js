import {Link} from "react-router-dom";
import logo from '../assests/cook_logo.png'
import {mdiLogin, mdiLogout} from "@mdi/js";
import Icon from "@mdi/react";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";
const Navbar = ()=>{

    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = ()=>{
        logout()
    }
    return(
        <header>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} className={"app-logo"} alt={"logo"}/>
                    </Link>
                </div>
                <div className="nav-links">
                    <Link to='/'>
                        <h3>HOME</h3>
                    </Link>
                    <Link to='/favourites'>
                        <h3>FAVOURITES</h3>
                    </Link>
                    <nav className="navbar-right">
                        <div>
                            {user && <div className="user-info"><span>{user.email}</span></div>}
                            <Link to={'/login'}>
                                <Icon onClick={handleClick} path={(!user) ? mdiLogin : mdiLogout} size={1} />
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
