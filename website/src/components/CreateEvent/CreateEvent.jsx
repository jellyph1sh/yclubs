import "./CreateEvent.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateEvent = ({ club }) => {
  const [cookies] = useCookies(["user", "token"]);
  const [errorCreateEvent, setErrorCreateEvent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
      "Content-Type": "application/json",
    },
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    createEvent();
    setTitle("");
    setDate("");
    setDescription("");
    e.title = "";
    e.data = "";
    e.description = "";
  };

  const createEvent = async () => {
    await axios
      .post(
        "http://localhost:3001/api/events/add",
        {
          idClub: club.idClub,
          name: title,
          description: description,
          idUser: cookies.user,
          date: date,
        },
        config
      )
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data.error);
          setErrorCreateEvent(response.data.error);
          return;
        }
        setErrorCreateEvent("");
        return;
      })
      .catch(function (error) {
        console.log(error);
        setErrorCreateEvent("error");
        return;
      });
  };

  return (
    <div className="ce-box">
      <h2 className="ce-title">Créer un évènement</h2>
      <div className="ce-inputs">
        {errorCreateEvent != "" && <p>{errorCreateEvent}</p>}
        <div className="ce-name">
          <label htmlFor="name">Titre :</label>
          <input
            type="text"
            name="name"
            id="ce-name-input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="ce-date">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            name="date"
            id="ce-date-input"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="ce-desc">
          <label htmlFor="desc">Description :</label>
          <textarea
            name="desc"
            id="ce-desc-input"
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
  );
};

export default CreateEvent;
