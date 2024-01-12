import "./MembersBox.css"

const MembersBox = () => {

    return (
        <div className="mb-box">
            <h2 className="mb-title">Membres</h2>
            <div className="mb-members">
                <div className="member">
                    <p>Sacha Sorgiati (sacha.sorgiati@ynov.com)</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="member">
                    <p>Mathias Bellaud (mathias.bellaud@ynov.com)</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="member">
                    <p>Evan Ferron (evan.ferron@ynov.com)</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}} />
                </div>
            </div>
            <div className="mb-add-member">
                <input type="email" name="email" id="input-addmember" />
                <button type="submit">Ajouter</button>
            </div>
        </div>
    );
}

export default MembersBox