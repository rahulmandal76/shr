import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import classes from './Register.module.css';

const EventSelectionSection = ({ eventsList, selectedEvents, onToggleEvent, teamMembers, onTeamMembersChange }) => {
    const [displayedTotal, setDisplayedTotal] = useState(0);

    const totalAmount = selectedEvents.reduce((total, eventId) => {
        const event = eventsList.find(e => e.id === eventId);
        const size = 1 + (teamMembers && teamMembers[eventId] ? teamMembers[eventId].length : 0);
        return total + (event ? event.price * size : 0);
    }, 0);

    // ... smooth number transition effect ...
    useEffect(() => {
        let startTimestamp = null;
        const duration = 400; // ms
        const initialTotal = displayedTotal;
        const targetTotal = totalAmount;

        if (initialTotal === targetTotal) return;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const current = Math.floor(progress * (targetTotal - initialTotal) + initialTotal);
            setDisplayedTotal(current);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setDisplayedTotal(targetTotal);
            }
        };

        window.requestAnimationFrame(step);
    }, [totalAmount]);

    return (
        <div className={classes.eventSelectionWrapper}>
            <h2 className={classes.sectionTitle}>
                Select Events to Participate
                <span className={classes.titleUnderline}></span>
            </h2>

            <div className={classes.eventsList}>
                {eventsList.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        isSelected={selectedEvents.includes(event.id)}
                        onClick={() => onToggleEvent(event.id)}
                        teamMembers={teamMembers[event.id] || []}
                        onTeamMembersChange={(sizes) => onTeamMembersChange && onTeamMembersChange(event.id, sizes)}
                    />
                ))}
            </div>

            <div className={classes.totalContainer}>
                <span className={classes.totalLabel}>Total Amount:</span>
                <span className={classes.totalValue}>
                    ₹<span className={classes.animatedNumber}>{displayedTotal}</span>
                </span>
            </div>
        </div>
    );
};

export default EventSelectionSection;
