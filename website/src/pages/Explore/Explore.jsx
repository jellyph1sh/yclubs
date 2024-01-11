import ClubsCard from "../../components/ClubsCard/ClubsCard";
import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useCookies } from "react-cookie";
import "./Explore.css";

const Explore = () => {
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
            <div className="exp-box">
                <h2 className="exp-title">Les clubs et assiociations</h2>
                <SearchBox/>
                <div className="list-cards">
                    <ClubsCard/>
                    <ClubsCard/>
                    <ClubsCard/>
                    <ClubsCard/>
                </div>
            </div>
        </>
    );
};

export default Explore