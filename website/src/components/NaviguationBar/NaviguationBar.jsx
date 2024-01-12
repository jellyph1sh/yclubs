import { Link, useNavigate } from "react-router-dom";
import "./NaviguationBar.css"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const NaviguationBar = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["user"]);
    const [cookieClub, setCookie] = useCookies(["idClub"]);
    
    const [idClub, setIdClub] = useState([]);
    const [isAsso, setIsAsso] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
        }
    };

    const bodyParameters = {
        idUser: cookies.user
     };

     let isClub = false;
     let isAsso_two = false;
     if (idClub != "" && isAsso == false){
        isClub = true
     } else if (idClub != "" && isAsso == true){
        isAsso_two = true
     }
    
    useEffect(() => {
          axios.post("http://localhost:3001/api/clubs/getClubByIdUser",bodyParameters, config)
          .then((response) => {
            setIdClub(response.data["idClub"])
            setIsAsso(response.data["isAsso"])
          })
          .catch(function (error) {
              console.log(error);
          })
          
      },[]);

    const navigateToClub = () => {
        setCookie("idClub",idClub  , { path: "/" });
        navigate('/');
    
    };

    return (
        <div className="navbar">
            <div className="nav-header">
                <h1 className="nav-title">YClubs</h1>
            </div>
            <div className="nav-body">
                <div className="nav-redirect">
                    <p className="nav-redirect-label">Naviguation :</p>
                    <div className="nav-redirect-buttons">
                        <Link to={"/"}>Accueil</Link>
                        <Link to={"/explore"}>Clubs</Link>
                        <Link to={"/events"}>Evenements</Link>
                        { isClub ?<><Link onClick={navigateToClub} to={"/"}>Gérer son club</Link></>:<></> }
                        { isAsso_two ?<><Link onClick={navigateToClub} to={"/"}>Gérer son association</Link></>:<></> }
                    </div>
                </div>
                <div className="nav-bottom-buttons">
                    <button className="b-createClub">Créer son club</button>
                    <button className="b-disconnect" onClick={() => {removeCookie("user");removeCookie("token")}}>Déconnexion</button>
                </div>
            </div>
        </div>
    );
};

export default NaviguationBar;