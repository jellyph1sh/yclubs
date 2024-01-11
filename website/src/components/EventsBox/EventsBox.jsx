import "./EventsBox.css"
import axios from "axios";
import EventNotif from "../EventNotif/EventNotif";
import { useEffect, useState } from "react";

const EventsBox = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/events/get3Last ")
        .then((response) => {
            setEvents(JSON.parse(response.data["events"]));
        })
        .catch(function (error) {
            console.log(error);
        })
    });

    return (
        <div className="e-box">
            <h2 className="e-title">Evenements</h2>
            <div className="e-events">
                {events.map(event => (
                    <EventNotif info={event}/>
                ))}
            </div>
            <a className="e-details" href="/events">Voir plus d'évènements</a>
        </div>
    );
};

export default EventsBox;