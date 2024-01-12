import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useCookies } from "react-cookie";
import "./Events.css";
import EventsCard from "../../components/EventsCard/EventsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Events = () => {
    const [cookies] = useCookies(["user", "token"]);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const config = {
        headers: { Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
        }
    };

    useEffect(() => {
        if (cookies.user == null) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:3001/api/events/getall",config)
        .then((response) => {
            setEvents(response.data["events"]);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    return (
        <>
            <NaviguationBar/>
            <div className="events-box">
                <h2 className="events-title">Les évènements</h2>
                <SearchBox/>
                <div className="events-cards">
                    {
                        events.length == 0
                        ? <p className="events-no-cards">Aucun évènements</p> :
                        events.map(event => (
                            <EventsCard info={event}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Events