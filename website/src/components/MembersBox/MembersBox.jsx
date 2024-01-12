import "./MembersBox.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const MembersBox = ({ club, members }) => {
  const [cookies] = useCookies(["user", "token"]);
  const [errorMembersManage, setErrorMembersManage] = useState("");
  const [email, setEmail] = useState("");
  const config = {
    headers: {
      authorization: `Bearer ${cookies.token}`,
      "Content-Type": "application/json",
    },
  };
  console.log(members);

  const handleDelete = async (idUser) => {
    await axios
      .delete("http://localhost:3001/api//clubsMembers/delete", {
        data: {
          idClub: club.idClub,
          idUser: idUser,
          headers: config.headers,
        },
      })
      .then((response) => {
        if (!response.data.status) {
          console.log(!response.data.error);
          setErrorMembersManage(!response.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  const handleAddMember = async () => {
    await axios
      .post(
        "http://localhost:3001/api/clubsMembers/addEmail",
        {
          email: email,
          clubId: club.idClub,
        },
        config
      )
      .then((response) => {
        console.log();
        if (!response.data.status) {
          console.log(response.data.error);
          setErrorMembersManage(response.data.error);
          return;
        }
        setErrorMembersManage("");
        window.location.reload();
        return;
      })
      .catch(function (error) {
        console.log(error);
        setErrorMembersManage("error");
        return;
      });
  };

  return (
    <div className="mb-box">
      <h2 className="mb-title">Membres</h2>
      {members.length == 0 ? (
        <div className="mb-members">
          <p>aucun membre n'est dans ce club</p>
        </div>
      ) : (
        <div className="mb-members">
          {members.map((member) => (
            <div className="member" key={member.idUser}>
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
            </div>
          ))}
        </div>
      )}
      {errorMembersManage && <p>{errorMembersManage}</p>}
      <div className="mb-add-member">
        <input
          type="email"
          name="email"
          id="input-addmember"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit" onClick={handleAddMember}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default MembersBox;
