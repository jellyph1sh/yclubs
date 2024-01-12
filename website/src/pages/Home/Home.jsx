import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import StatisticsBox from "../../components/StatisticsBox/StatisticsBox";
import LastClubBox from "../../components/LastClubBox/LastClubBox";
import EventsBox from "../../components/EventsBox/EventsBox";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

function Home() {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

    useEffect(() => {
      if (cookies.user == null) {
        navigate("/login");
        return;
      }
    },[]);

  return (
    <>
      <NaviguationBar/>
      <StatisticsBox/>
      <LastClubBox/>
      <EventsBox/>
    </>
  )
};

export default Home;