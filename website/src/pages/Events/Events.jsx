import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useCookies } from "react-cookie";
import "./Events.css";
import EventsCard from "../../components/EventsCard/EventsCard";

const Events = () => {
    const [cookies] = useCookies(["user"]);

    useEffect(() => {
        if (cookies.user == null) {
            navigate("/login");
            return;
        }
    }, [])

    return (
        <>
            <NaviguationBar/>
            <div className="events-box">
                <h2 className="events-title">Les évènements</h2>
                <SearchBox/>
                <div className="events-cards">
                    <EventsCard/>
                    <EventsCard/>
                    <EventsCard/>
                </div>
            </div>
        </>
    );
};

export default Events