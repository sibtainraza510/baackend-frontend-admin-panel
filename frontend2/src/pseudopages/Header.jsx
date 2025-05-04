import {NavLink} from "react-router-dom"
import { useAuth } from "../store/Auth";
import "./Header.css";
const Header = () =>{
    const {isLoggedIn, user } = useAuth()
    return (
        <>
          <header>
            <div className="container">
              <div className="logo-brand">
                <NavLink to="/">RAZA-Technical</NavLink>
              </div>
    
              <nav>
                <ul>
                 
                {isLoggedIn && user?.isadmin && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
                
                  <li>
                    <NavLink to="/"> Home </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about"> About </NavLink>
                  </li>
                  <li>
                    <NavLink to="/services"> Services </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact"> Contact </NavLink>
                  </li>
                  {isLoggedIn ? (
                    <li>
                      <NavLink to="/logout">Logout</NavLink>
                    </li>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/register"> Register </NavLink>
                      </li>
                      <li>
                        <NavLink to="/signin"> Login </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </header>
        </>
      );
}
export default Header