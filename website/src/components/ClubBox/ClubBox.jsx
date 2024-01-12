import { useEffect, useState } from "react";
import axios from "axios";
import "./ClubBox.css"

const ClubBox = () => {
    return (
        <div className="club-box">
            <div className="club-header-box">
                <img className="club-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhyNT_gXtdTOzVXSECrQpvO6DOyj028BG9hw&usqp=CAU" alt="club logo" />
                <div className="club-title-box">
                    <h3 className="club-title">Bureau des Sports</h3>
                    <h4 className="club-alias">BDS</h4>
                </div>
            </div>
            <div className="club-description-box">
                <p className="club-description-title">Description</p>
                <p className="club-description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quas earum, ea quaerat harum culpa suscipit sequi molestias libero, amet beatae eum rerum minima at voluptates magni hic ratione sapiente</p>
            </div>
            <div className="club-roles-box">
                <p className="club-role-title">Rôles</p>

                <div className="club-role">
                    <p className="club-role-name">Président : Michel Tin</p>
                    <p className="club-role-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="club-role">
                    <p className="club-role-name">Trésorier : jean thuaut</p>
                    <p className="club-role-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="club-role">
                    <p className="club-role-name">Secrétaire : denis brognard Tin</p>
                    <p className="club-role-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div className="club-events-box">
                <p className="club-events-title">Prochain évènement(s)</p>
                <div className="club-event-card">
                    <div className="club-event-card-header">
                        <p className="club-events-card-title">Tournoi de volley</p>
                        <svg height="1.9vw" width="1.2vw" viewBox="0 0 448 512" className="club-event-card-arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </div>
                    <p className="club-events-card-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium pariatur sit quaerat necessitatibus minus nihil laudantium eligendi culpa aliquid mollitia repudiandae totam repellat</p>
                </div>
                <div className="club-event-card">
                    <div className="club-event-card-header">
                        <p className="club-events-card-title">Match de basket</p>                        
                        <svg height="1.9vw" width="1.2vw" viewBox="0 0 448 512" className="club-event-card-arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </div>
                    <p className="club-events-card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic eligendi nihil maxime? Deleniti odit corporis veniam, aut voluptatibus, similique autem nam consectetur neque omnis animi mole</p>
                </div>
            </div>
        </div>
    );
}

export default ClubBox