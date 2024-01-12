import { useEffect, useState } from "react";
import "./ClubInfo.css";
import { useCookies } from "react-cookie";
import axios from "axios";

const ClubInfo = ({ club }) => {
  const [cookies] = useCookies(["user", "token"]);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    console.log(club, "clubinfo");
    if (cookies.user == null) {
      navigate("/login");
      return;
    }
    setName(club.name);
    setAlias(club.alias);
    setImage(club.image);
    setDescription(club.description);
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    updateClub();
    if (errorUpdate != "") {
      setName(club.name);
      setAlias(club.alias);
      setImage(club.image);
      setDescription(club.description);
      e.name = name;
      e.alias = alias;
      e.image = image;
      e.description = description;
    }
  };

  const updateClub = async () => {
    await axios
      .post(
        "http://localhost:3001/api/clubs/update",
        {
          idClub: club.idClub,
          newName: name,
          idUser: cookies.user,
          description: description,
          image: image,
          alias: alias,
        },
        config
      )
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data.error);
          setErrorUpdate(response.data.error);
          return;
        }
        setErrorUpdate("");
        return;
      })
      .catch(function (error) {
        console.log(error);
        setErrorUpdate("error");
        return;
      });
  };

  return (
    <div className="ci-box">
      <h2 className="ci-title">Informations</h2>
      <div className="ci-info">
        <div className="ci-info-left">
          <div className="ci-name">
            {errorUpdate != "" && <p>{errorUpdate}</p>}
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              name="name"
              id="ci-name-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="ci-alias">
            <label htmlFor="alias">Alias :</label>
            <input
              type="text"
              name="alias"
              id="ci-alias-input"
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="ci-info-right">
          <div className="ci-logo">
            <label htmlFor="logo-url">Logo (URL) :</label>
            <input
              type="text"
              name="logo-url"
              id="ci-logo-input"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="ci-desc">
            <label htmlFor="desc">Description :</label>
            <textarea
              name="desc"
              id="ci-desc-input"
              cols="30"
              rows="5"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button onClick={handlesubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default ClubInfo;
