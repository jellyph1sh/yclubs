import "./EventNotif.css"

const EventNotif = () => {
    return (
        <div className="en-box">
            <div className="en-header">
                <img className="en-header-icon" src="/src/assets/images/mark_unread_chat.svg" alt="notif icon" />
                <h3 className="en-header-title">Title</h3>
                <h4 className="en-header-alias">Alias</h4>
            </div>
            <p className="en-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem alias quas cum impedit laborum. Odio enim quo exercitationem laudantium sunt quis similique numquam dolor consequatur. Aspernatur ullam veritatis quo a?</p>
            <a className="en-details" href="/events">Voir plus de détails</a>
        </div>
    );
};

export default EventNotif;