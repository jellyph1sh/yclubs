import "./LastClubBox.css"

const LastClubBox = () => {
    return (
        <div className="lc-box">
            <h2 className="lc-title">Dernier club créé</h2>
            <div className="lc-content">
                <img className="lc-club-logo" src="/src/assets/images/fake_club_logo.jpg" alt="club logo" />
                <div className="lc-club-info">
                    <h3 className="lc-club-title">Bureau des sports</h3>
                    <h4 className="lc-club-alias">Alias BDS</h4>
                    <p className="lc-club-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptatem saepe cupiditate autem voluptatibus vel voluptas laboriosam quo! Excepturi voluptatum sit corporis perspiciatis animi accusamus a magni aliquam distinctio doloremque!</p>
                </div>
            </div>
            <a className="lc-details" href="/club">Voir plus de détails</a>
        </div>
    );
}

export default LastClubBox