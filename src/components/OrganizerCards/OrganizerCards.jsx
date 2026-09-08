import React from "react";
import classes from "./OrganizerCards.module.css";

import cipherImg from "../../assets/club logos/Arya Cipher Coding Club.jpg";
import musicImg from "../../assets/club logos/Arya Music Club.jpg";
import danceImg from "../../assets/club logos/Arya Dance Club.jpg";
import hackathonImg from "../../assets/club logos/Arya Hackathon Club.jpg";
import photoImg from "../../assets/club logos/Arya PhotoSphere Club.jpg";
import roboticsImg from "../../assets/club logos/Arya Robotics Club.jpg";
import gdgImg from "../../assets/club logos/gdg.png";

const clubs = [
    { name: "Arya Cipher Coding Club", img: cipherImg },
    { name: "Google Developer Group ACEIT", img: gdgImg, bg: "white" },
    { name: "Arya Music Club", img: musicImg },
    { name: "Arya Dance Club", img: danceImg },
    { name: "Arya Hackathon Club", img: hackathonImg },
    { name: "Arya PhotoSphere Club", img: photoImg },
    { name: "Arya Robotics Club", img: roboticsImg },
    { isMore: true, name: "MANY MORE", link: "https://www.aryacollege.in/arya-events/student-clubs" }
];

const OrganizerCards = () => {
    // Duplicate clubs array for seamless infinite right-to-left loop
    const marqueeClubs = [...clubs, ...clubs];

    return (
        <section className={classes.section}>
            <div className={classes.header}>
                <h3 className={classes.subtitle}>Behind the Magic</h3>
                <h2 className={classes.title}>Organized By</h2>
                <div className={classes.divider}></div>
            </div>

            <div className={classes.carouselContainer}>
                <div className={classes.track}>
                    {marqueeClubs.map((club, i) => (
                        club.isMore ? (
                            <a
                                key={`more-${i}`}
                                href={club.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${classes.card} ${classes.moreCard}`}
                            >
                                <div className={classes.moreIcon}>
                                    <span>+</span>
                                </div>
                                <p className={`${classes.name} ${classes.moreTitle}`}>{club.name}</p>
                            </a>
                        ) : (
                            <div key={`club-${i}`} className={classes.card}>
                                <div className={classes.imgWrap}>
                                    <img 
                                        src={club.img} 
                                        alt={club.name} 
                                        className={classes.logo} 
                                        style={{ backgroundColor: club.bg || 'transparent' }} 
                                        loading="lazy" 
                                        decoding="async" 
                                    />
                                </div>
                                <p className={classes.name}>{club.name}</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrganizerCards;
