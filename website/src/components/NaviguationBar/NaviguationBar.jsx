import { Link, useNavigate } from "react-router-dom";
import "./NaviguationBar.css"
import { useCookies } from "react-cookie";

const NaviguationBar = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

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
                        <Link to={"/"}>Gérer son club/association</Link>
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