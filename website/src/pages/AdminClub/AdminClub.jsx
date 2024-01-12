import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import { useCookies } from "react-cookie";
import "./AdminClub.css";
import { useNavigate } from "react-router-dom";
import ClubInfo from "../../components/ClubInfo/ClubInfo";
import MembersBox from "../../components/MembersBox/MembersBox";
import EventsClubAdmin from "../../components/EventsClubAdmin/EventsClubAdmin";

const AdminClub = () => {
    /*const [cookies] = useCookies(["user", "token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.user == null) {
            navigate("/login");
            return;
        }
    }, [])*/

    return (
        <>
            <NaviguationBar/>
            <div className="ac-box">
                <div className="ac-header">
                    <h2 className="ac-title">Gestion Club de Tennis</h2>
                    <h3 className="ac-balance">Solde: <span className="bold">200€</span></h3>
                    <ClubInfo/>
                    <MembersBox/>
                    <EventsClubAdmin/>
                </div>
            </div>
        </>
    );
};

export default AdminClub