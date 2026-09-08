import React from 'react';
import classes from './SpecialEvents.module.css';
import { eventsData } from '../../assets/eventsData';
import EventCard from '../common/EventCard/EventCard';

const SpecialEvents = () => {
    const specialEvents = eventsData.filter(event => event.isSpecial);

    return (
        <section className={classes.specialSection}>
            <h2 className={classes.mainHeading}>Special Events</h2>

            <div className={classes.cardsContainer}>
                {specialEvents.map(event => (
                    <EventCard key={event.id} eventData={event} />
                ))}
            </div>
        </section>
    );
};

export default SpecialEvents;
