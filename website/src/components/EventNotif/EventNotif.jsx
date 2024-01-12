import "./EventNotif.css"

const EventNotif = (props) => {
    return (
        <div className="en-box">
            <div className="en-header">
                <img className="en-header-icon" src="/src/assets/images/mark_unread_chat.svg" alt="notif icon" />
                <h3 className="en-header-title">{props.info.name}</h3>
                <h4 className="en-header-alias">{props.info.alias}</h4>
            </div>
            <p className="en-desc">{props.info.description}</p>
            <a className="en-details" href="/events">Voir plus de détails</a>
        </div>
    );
};

export default EventNotif;