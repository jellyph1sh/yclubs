import { useEffect, useState } from "react";
import axios from "axios";
import "./ClubBox.css"
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ClubBox = () => {

    const [club, setClub] = useState([]);
    const [president, setPresident] = useState([]);
    const [event_one, setEvent_one] = useState([]);
    const [event_two, setEvent_two] = useState([]);
    const [isAsso, setIsAsso] = useState([]);
    const [isPresident, setIsPresident] = useState([]);
    const [cookies, setCookies] = useCookies(["token"]);

    const config = {
        headers: { Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
        }
    };

    const bodyParameters = {
        idClub: cookies.idClub
     };

    useEffect(() => {
        console.log(cookies.idClub)
        console.log("useeffect used")
        axios.post("http://localhost:3001/api/clubs/getOneById",bodyParameters, config)
        .then((response) => {
            setClub(response.data["club"])
            setPresident(response.data["president"])
            setEvent_one(response.data["event_one"])
            setEvent_two(response.data["event_two"])
            setIsAsso(response.data["isAsso"])
            setIsPresident(response.data["isPresident"])
        })
        .catch(function (error) {
            console.log(error);
        })
    },[]);

    const isEventOne = event_one!="";
    const isEventTwo = event_two!="";

    return (
        <div className="club-box">
            <div className="club-header-box">
                <img className="club-logo" src={club.image} alt="club logo" />
                <div className="club-title-box">
                    <h3 className="club-title">{club.name}</h3>
                    <h4 className="club-alias">{club.alias}</h4>
                </div>
            </div>
            <div className="club-description-box">
                <p className="club-description-title">Description</p>
                <p className="club-description-text">{club.description}</p>
            </div>
            <div className="club-roles-box">
                <p className="club-role-title">Rôles</p>

                <div className="club-role">
                    <p className="club-role-name">Président : {president.firstname} {president.lastname}</p>
                    <p className="club-role-description">{president.description}</p>
                </div>
            </div>
            <div className="club-events-box">
                <p className="club-events-title">Prochain évènement(s)</p>
                {isEventOne ? 
                    <><div className="club-event-card">
                        <div className="club-event-card-header">
                            <p className="club-events-card-title">{event_one.name}</p>
                            <svg height="1.9vw" width="1.2vw" viewBox="0 0 448 512" className="club-event-card-arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                        </div>
                        <p className="club-events-card-description">{event_one.description}</p>
                    </div>
                    {isEventTwo ?
                    <><div className="club-event-card">
                        <div className="club-event-card-header">
                            <p className="club-events-card-title">{event_two.name}</p>
                            <svg height="1.9vw" width="1.2vw" viewBox="0 0 448 512" className="club-event-card-arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                        </div>
                        <p className="club-events-card-description">{event_two.description}</p>
                    </div></>:<></>}</>
                :<></>}
            </div>
        </div>
    );
}

export default ClubBox