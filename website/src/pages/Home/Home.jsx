import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import StatisticsBox from "../../components/StatisticsBox/StatisticsBox";
import LastClubBox from "../../components/LastClubBox/LastClubBox";
import EventsBox from "../../components/EventsBox/EventsBox";
import "./Home.css";

function Home() {
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