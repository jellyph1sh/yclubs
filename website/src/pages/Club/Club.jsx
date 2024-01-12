import NaviguationBar from "../../components/NaviguationBar/NaviguationBar";
import ClubBox from "../../components/ClubBox/ClubBox";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Club.css";
import { useEffect } from "react";

function Club() {
  // const [cookies] = useCookies(["user"]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (cookies.user == null) {
  //     navigate("/login");
  //     return;
  //   }
  // })
  return (
    <>
      <NaviguationBar/>
      <ClubBox/>
    </>
  )
};

export default Club;