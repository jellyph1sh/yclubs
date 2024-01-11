import "./ClubsCard.css";

const ClubsCard = () => {
    return (
        <div className="cc-box">
            <img className="cc-logo" src="/src/assets/images/fake_club_logo.jpg" alt="fake club logo" />
            <div className="cc-informations">
                <h3 className="cc-title">Bureau des sports</h3>
                <h4 className="cc-alias">BDS</h4>
                <p className="cc-desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi necessitatibus officiis molestias tempore, reprehenderit, molestiae provident libero voluptatem quibusdam beatae atque ut quam tempora labore, eveniet recusandae eos? Animi, quaerat!</p>
            </div>
            <img className="cc-arrow" src="src/assets/images/arrow-forward.svg" alt="arrow forward icon" onClick={() => {console.log("open club page")}}/>
        </div>
    );
};

export default ClubsCard;