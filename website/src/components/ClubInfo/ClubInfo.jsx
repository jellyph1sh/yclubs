import "./ClubInfo.css"

const ClubInfo = () => {

    return (
        <div className="ci-box">
            <h2 className="ci-title">Informations</h2>
            <div className="ci-info">
                <div className="ci-info-left">
                    <div className="ci-name">
                        <label htmlFor="name">Nom :</label>
                        <input type="text" name="name" id="ci-name-input" value="Club tennis de table" />
                    </div>
                    <div className="ci-alias">
                        <label htmlFor="alias">Alias :</label>
                        <input type="text" name="alias" id="ci-alias-input" value="CTDT" />
                    </div>
                </div>
                <div className="ci-info-right">
                    <div className="ci-logo">
                        <label htmlFor="logo-url">Logo (URL) :</label>
                        <input type="text" name="logo-url" id="ci-logo-input" value="http://image.com/chat" />
                    </div>
                    <div className="ci-desc">
                        <label htmlFor="desc">Description :</label>
                        <textarea name="desc" id="ci-desc-input" cols="30" rows="5" value="Tennis de table c'est bien rejoins nous !"></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubInfo