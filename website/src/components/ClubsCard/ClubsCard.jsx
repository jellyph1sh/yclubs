import { useNavigate } from "react-router-dom";
import "./ClubsCard.css";
import { useCookies } from "react-cookie";

const ClubsCard = (props) => {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(["idClub"]);

    const navigateToClub = () => {
        setCookie("idClub",props.info.idClub  , { path: "/" });
        navigate('/club');
        
      };

    return (
        <div className="cc-box">
            <img className="cc-logo" src={props.info.image} alt="club logo" />
            <div className="cc-informations">
                <h3 className="cc-title">{props.info.name}</h3>
                <h4 className="cc-alias">{props.info.alias}</h4>
                <p className="cc-desc">{props.info.description}</p> 
            </div>
            <img onClick={navigateToClub} className="cc-arrow" src="src/assets/images/arrow-forward.svg" alt="arrow forward icon" />
        </div>
    );
};

export default ClubsCard;