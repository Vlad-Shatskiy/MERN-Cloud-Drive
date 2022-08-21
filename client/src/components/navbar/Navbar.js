import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/img/logo2.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import Gravatar from "react-gravatar";
export default function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  function setSearchHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }
  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/">
          <img src={Logo} alt="" className="navbar__logo" />
        </NavLink>
        <div className="navbar__header">MERN CLOUD DRIVE</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => setSearchHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="Search..."
          />
        )}

        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Log in</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Sign up</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Log out
          </div>
        )}

        {isAuth && (
          <Gravatar email={currentUser.email} size={50} default="robohash" />
        )}
      </div>
    </div>
  );
}
