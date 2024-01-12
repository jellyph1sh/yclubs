import "./CreateClub.css"

const CreateClub = () => {

    return (
        <div className="crc-box">
            <h2 className="crc-title">Créer un club</h2>
            <div className="crc-inputs">
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
                    <input type="number" name="image" id="crc-balance-input"/>
                </div>
                <div className="crc-chief">
                    <label htmlFor="chief">Responsable (email) :</label>
                    <input type="email" name="chief" id="crc-chief-input" />
                </div>
                <button type="submit">Créer</button>
            </div>
        </div>
    );
}

export default CreateClub