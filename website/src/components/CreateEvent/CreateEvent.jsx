import "./CreateEvent.css"

const CreateEvent = () => {

    return (
        <div className="ce-box">
            <h2 className="ce-title">Créer un évènement</h2>
            <div className="ce-inputs">
                <div className="ce-name">
                    <label htmlFor="name">Titre :</label>
                    <input type="text" name="name" id="ce-name-input"/>
                </div>
                <div className="ce-date">
                    <label htmlFor="date">Date :</label>
                    <input type="date" name="date" id="ce-date-input" />
                </div>
                <div className="ce-desc">
                    <label htmlFor="desc">Description :</label>
                    <textarea name="desc" id="ce-desc-input" cols="30" rows="5"></textarea>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent