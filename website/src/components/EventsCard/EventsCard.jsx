import "./EventsCard.css";

const EventsCard = (props) => {
    return (
        <div className="ec-box">
            <p className="ec-date">{props.info.date}</p>
            <div className="ec-titles">
                <h3 className="ec-title">{props.info.name}</h3>
                <h4 className="ec-alias">{props.info.alias}</h4>
            </div>
            <p className="ec-desc">{props.info.description}</p>
            <button className="ec-button" onClick={() => {console.log("Je participe!")}}>Participer</button>
        </div>
    );
};

export default EventsCard;