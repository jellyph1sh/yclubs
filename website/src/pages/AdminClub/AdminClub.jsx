import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import { useCookies } from "react-cookie";
import "./AdminClub.css";
import { useNavigate } from "react-router-dom";

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
                <h2 className="ac-title">Gestion Club</h2>
            </div>
        </>
    );
};

export default AdminClub