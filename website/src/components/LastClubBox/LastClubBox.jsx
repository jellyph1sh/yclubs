import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./LastClubBox.css"

const LastClubBox = () => {
    const [lastClub, setLastClub] = useState([]);
    const [cookies, setCookies] = useCookies(["token"]);

    const config = {
        headers: { Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
        }
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/clubs/getLast",config)
        .then((response) => {
            setLastClub(response.data["club"])
        })
        .catch(function (error) {
            console.log(error);
        })
    },[]);

    return (
        <div className="lc-box">
            <h2 className="lc-title">Dernier club créé</h2>
            <div className="lc-content">
                <img className="lc-club-logo" src={lastClub.image} alt="club logo" />
                <div className="lc-club-info">
                    <h3 className="lc-club-title">{lastClub.name}</h3>
                    <h4 className="lc-club-alias">{lastClub.alias}</h4>
                    <p className="lc-club-description">{lastClub.description}</p>
                </div>
            </div>
            <a className="lc-details" href="/club">Voir plus de détails</a>
        </div>
    );
}

export default LastClubBox