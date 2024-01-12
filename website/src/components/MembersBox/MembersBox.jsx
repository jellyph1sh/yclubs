import "./MembersBox.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const MembersBox = ({ club, members }) => {
  //   const [cookies] = useCookies(["user", "token"]);
  //   const [errorCreateEvent, setErrorCreateEvent] = useState("");
  //   const [emai, setEmail] = useState("");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${cookies.token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  const handleDelete = async (idUser) => {};

  const handleAddMember = async (emailUser) => {};

  return (
    <div className="mb-box">
      <h2 className="mb-title">Membres</h2>
      <div className="mb-members">
        {/* {members.map((member) => {
          <div className="member" key={idUser}>
            <p>
              {member.firstName} {member.lastName} {member.email}
            </p>
            <img
              src="/src/assets/images/bin.svg"
              alt="trash icon"
              onClick={() => {
                console.log("delete");
                handleDelete(member.idUser);
              }}
            />
          </div>;
        })} */}
        <div className="member">
          <p>Sacha Sorgiati (sacha.sorgiati@ynov.com)</p>
          <img
            src="/src/assets/images/bin.svg"
            alt="trash icon"
            onClick={() => {
              console.log("delete");
            }}
          />
        </div>
        <div className="member">
          <p>Mathias Bellaud (mathias.bellaud@ynov.com)</p>
          <img
            src="/src/assets/images/bin.svg"
            alt="trash icon"
            onClick={() => {
              console.log("delete");
            }}
          />
        </div>
        <div className="member">
          <p>Evan Ferron (evan.ferron@ynov.com)</p>
          <img
            src="/src/assets/images/bin.svg"
            alt="trash icon"
            onClick={() => {
              console.log("delete");
            }}
          />
        </div>
      </div>
      <div className="mb-add-member">
        <input type="email" name="email" id="input-addmember" />
        <button type="submit" onClick={handleAddMember}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default MembersBox;
