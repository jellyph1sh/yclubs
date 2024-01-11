import "./NaviguationBar.css"
import { useCookies } from "react-cookie";

const NaviguationBar = () => {
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
                        <a href="/">Accueil</a>
                        <a href="/">Clubs</a>
                        <a href="/">Evenements</a>
                        <a href="/">Gérer son club/association</a>
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