import "./CreateClub.css"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateClub = () => {
    const [cookies, setCookie] = useCookies(["idClub"]);
    
    const config = {
        headers: { Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
        }
    };



     const createClub = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/api/clubs/add", {name: e.target.name.value, alias: e.target.alias.value, description: e.target.desc.value, tags: e.target.tags.value, capital: e.target.capital.value, image: e.target.image.value, email: e.target.chief.value, idClubParent : cookies.idClub} ,config)
          .catch((err) => {
            console.log(err);
          });
      }


    return (
        <div className="crc-box">
            <h2 className="crc-title">Créer un club</h2>
            <div className="crc-inputs">
                <form onSubmit={createClub}>
                    <div className="crc-name">
                        <label htmlFor="name">Nom :</label>
                        <input type="text" name="name" id="crc-name-input"/>
                    </div>
                    <div className="crc-alias">
                        <label htmlFor="alias">Alias :</label>
                        <input type="text" name="alias" id="crc-alias-input"/>
                    </div>
                    <div className="crc-desc">
                        <label htmlFor="desc">Description :</label>
                        <textarea name="desc" id="crc-desc-input" cols="30" rows="5"></textarea>
                    </div>
                    <div className="crc-tags">
                        <label htmlFor="tags">Tags :</label>
                        <input type="text" name="tags" id="crc-tags-input"/>
                    </div>
                    <div className="crc-image">
                        <label htmlFor="image">Logo (URL) :</label>
                        <input type="text" name="image" id="crc-image-input"/>
                    </div>
                    <div className="crc-balance">
                        <label htmlFor="image">Capital de départ :</label>
                        <input type="number" name="capital" id="crc-balance-input"/>
                    </div>
                    <div className="crc-chief">
                        <label htmlFor="chief">Responsable (email) :</label>
                        <input type="email" name="chief" id="crc-chief-input" />
                    </div>
                    <button type="submit">Créer</button>
                </form>
            </div>
        </div>
    );
}

export default CreateClub