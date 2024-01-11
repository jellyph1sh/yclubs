import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import StatisticsBox from "../../components/StatisticsBox/StatisticsBox";
import LastClubBox from "../../components/LastClubBox/LastClubBox";
import EventsBox from "../../components/EventsBox/EventsBox";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();
  return (
    <>
      { cookies.user == null ?
      navigate("/login")
      :
        <div className="body">
          <NaviguationBar/>
          <StatisticsBox/>
          <LastClubBox/>
          <EventsBox/>
        </div>
      }
    </>
  )
};

export default Home;