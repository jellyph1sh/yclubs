import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./AdminClub.css";
import { useNavigate } from "react-router-dom";
import ClubInfo from "../../components/ClubInfo/ClubInfo";
import MembersBox from "../../components/MembersBox/MembersBox";
import EventsClubAdmin from "../../components/EventsClubAdmin/EventsClubAdmin";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import { useEffect, useState } from "react";

const AdminClub = () => {
  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [club, setClub] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
      "Content-Type": "application/json",
    },
  };

  const erroAppend = (errorCode = "") => {
    if (errorCode != "") {
      console.log(errorCode);
      alert(errorCode);
    } else {
      console.log("something bad happend");
    }
    return;
  };

  useEffect(() => {
    if (cookies.user == null) {
      navigate("/login");
      return;
    }
    axios
      .post(
        "http://localhost:3001/api/clubs/getAdminPage",
        { idClub: 27 },
        config
      )
      .then((response) => {
        console.log("response", response);
        if (!response.data.status) {
          erroAppend(response.data.error);
          return;
        }
        setMembers(response.data["members"]);
        setEvents(response.data["events"]);
        setClub(response.data["club"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NaviguationBar />
      <div className="ac-box">
        <div className="ac-header">
          <h2 className="ac-title">Gestion Club de Tennis</h2>
          <h3 className="ac-balance">
            Solde: <span className="bold">200€</span>
          </h3>
          {club && <ClubInfo club={club} />}
          {club && <MembersBox club={club} members={members} />}
          {club && <EventsClubAdmin club={club} />}
          {club && <CreateEvent club={club} />}
        </div>
      </div>
    </>
  );
};

export default AdminClub;
