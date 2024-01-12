import "./EventsClubAdmin.css"

const EventsClubAdmin = () => {

    return (
        <div className="eca-box">
            <h2 className="eca-title">Evenements</h2>
            <div className="eca-events">
                <div className="event">
                    <div className="event-header">
                        <h4 className="event-title">Tournoi de volley</h4>
                        <p className="event-date">04/02/2024</p>
                    </div>
                    <p className="event-desc">Little description!</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="event">
                    <div className="event-header">
                        <h4 className="event-title">Tournoi de volley</h4>
                        <p className="event-date">04/02/2024</p>
                    </div>
                    <p className="event-desc">Little description!</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="event">
                    <div className="event-header">
                        <h4 className="event-title">Tournoi de volley</h4>
                        <p className="event-date">04/02/2024</p>
                    </div>
                    <p className="event-desc">Little description!</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="event">
                    <div className="event-header">
                        <h4 className="event-title">Tournoi de volley</h4>
                        <p className="event-date">04/02/2024</p>
                    </div>
                    <p className="event-desc">Little description!</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
                <div className="event">
                    <div className="event-header">
                        <h4 className="event-title">Tournoi de volley</h4>
                        <p className="event-date">04/02/2024</p>
                    </div>
                    <p className="event-desc">Little description!</p>
                    <img src="/src/assets/images/bin.svg" alt="trash icon" onClick={() => {console.log("delete")}}/>
                </div>
            </div>
        </div>
    );
}

export default EventsClubAdmin