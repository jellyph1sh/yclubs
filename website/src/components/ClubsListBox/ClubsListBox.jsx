import "./ClubsListBox.css"

const ClubsListBox = () => {

    return (
        <div className="clb-box">
            <h2 className="clb-title">Clubs</h2>
            <div className="clb-clubs">
                <div className="club">
                    <h4 className="club-name">Bureau des sports</h4>
                    <p className="club-description">Bureau des sports</p>
                    <div className="club-icons">
                    <img src="/src/assets/images/view.svg" alt="view icon" onClick={() => {console.log("redirect to club admin page")}}/>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                    </div>
                </div>
                <div className="club">
                    <h4 className="club-name">Bureau des sports</h4>
                    <p className="club-description">Bureau des sports</p>
                    <div className="club-icons">
                    <img src="/src/assets/images/view.svg" alt="view icon" onClick={() => {console.log("redirect to club admin page")}}/>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubsListBox