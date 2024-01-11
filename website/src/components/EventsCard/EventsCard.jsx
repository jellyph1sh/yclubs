import "./EventsCard.css";

const EventsCard = () => {
    return (
        <div className="ec-box">
            <p className="ec-date">07/05/2024</p>
            <div className="ec-titles">
                <h3 className="ec-title">Tournoi de volley</h3>
                <h4 className="ec-alias">BDS</h4>
            </div>
            <p className="ec-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, alias. Nihil minus dicta dolore illo amet iusto similique neque atque quas repudiandae, quod id soluta voluptatum obcaecati laborum architecto quos.</p>
            <button className="ec-button" onClick={() => {console.log("Je participe!")}}>Participer</button>
        </div>
    );
};

export default EventsCard;