import "./EventsBox.css"
import EventNotif from "../EventNotif/EventNotif";

const EventsBox = () => {
    return (
        <div className="e-box">
            <h2 className="e-title">Evenements</h2>
            <div className="e-events">
                <EventNotif/>
                <EventNotif/>
                <EventNotif/>
            </div>
            <a className="e-details" href="/events">Voir plus d'évènements</a>
        </div>
    );
};

export default EventsBox;