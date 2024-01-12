import "./ClubsCard.css";

const ClubsCard = (props) => {
    console.log(props.info.image);
    return (
        <div className="cc-box">
            <img className="cc-logo" src={props.info.image} alt="club logo" />
            <div className="cc-informations">
                <h3 className="cc-title">{props.info.name}</h3>
                <h4 className="cc-alias">{props.info.alias}</h4>
                <p className="cc-desc">{props.info.description}</p>
            </div>
            <img className="cc-arrow" src="src/assets/images/arrow-forward.svg" alt="arrow forward icon" onClick={() => {console.log("open club page")}}/>
        </div>
    );
};

export default ClubsCard;