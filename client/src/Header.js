import React from "react";
import { useState } from "react";
import "./Header.css";
import logo from "./images/207a2b17fb9dfb995097e923c53eec1f.gif";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import axios from "axios";

function Header(props) {
  const [{ user }, dispatch] = useStateValue();
  const [menu, setMenu] = useState("none");

  const  Delete = (e) => {
      axios({
        method: "Delete",
        url: "http://localhost:3000/users/me",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data)
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  function Logout() {
    window.location.reload(false);
  }
  
  function moreOptions() {
    if (menu == "block") {
      setMenu("none");
    } else {
      setMenu("block");
    }
  }
  return (
    <>
      <div className="header">
        <div className="header_left">
          <img src={logo} alt={""} className="src" />
          <div className="header_input">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search on Go-Findme"
              className="text"
            />
          </div>
        </div>
        <div id="A" className="header_center">
          <div className={`header_option header_option-${props.cName}`}>
            <Link style={{ color: "grey" }} to="/">
              <HomeIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/location">
              <LocationOnIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/addpost">
              <AddIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/search">
              <ImageSearchIcon fontSize="large" />
            </Link>
          </div>
          <div className="header_option">
            <Link style={{ color: "grey" }} to="/trusted">
              <SupervisedUserCircleIcon fontSize="large" />
            </Link>
          </div>
        </div>
        <div className="header_right">
          <div>
            <Link to="/messages">
              <IconButton>
                <ForumIcon />
              </IconButton>
            </Link>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={moreOptions}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* tazbeet el window bta3t el more options */}
      <div className="more-options" style={{ display: `${menu}` }}>
        <ul>
          <Link className="more-options-li" to="/profile">
            <li>Profile</li>
          </Link>
          <Link className="more-options-li" to="/location">
            <li>Maps</li>
          </Link>
          <Link className="more-options-li" to="/trusted">
            <li>Trusted Friends</li>
          </Link>
          <Link className="more-options-li" to="/settings">
            <li>Settings</li>
          </Link>
          <Link className="more-options-li" to="/" onClick={Logout}>
            <li>Logout</li>
          </Link>
          <Link className="more-options-li" to="/" onClick={Delete}>
            <li>Delete Your Account</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Header;
