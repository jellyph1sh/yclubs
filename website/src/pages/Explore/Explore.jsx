import ClubsCard from "../../components/ClubsCard/ClubsCard";
import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useCookies } from "react-cookie";
import "./Explore.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Explore = () => {
    const [cookies] = useCookies(["user", "token"]);
    const navigate = useNavigate();
    const [clubs, setClubs] = useState([]);

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

        axios.get("http://localhost:3001/api/clubs/getall",config)
        .then((response) => {
            setClubs(response.data["clubs"]);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    return (
        <>
            <NaviguationBar/>
            <div className="exp-box">
                <h2 className="exp-title">Les clubs et assiociations</h2>
                <SearchBox/>
                <div className="list-cards">
                    {
                    clubs.map(club => (
                        <ClubsCard key={club.idClub} info={club}/>
                    ))
                    }
                </div>
            </div>
        </>
    );
};

export default Explore