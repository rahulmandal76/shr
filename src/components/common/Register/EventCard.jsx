import React from 'react';
import classes from './Register.module.css';

const EventCard = ({ event, isSelected, onClick, teamMembers, onTeamMembersChange }) => {

    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    const handleAddMember = (e) => {
        e.stopPropagation();
        const currentMembers = teamMembers || [];
        const maxSize = parseInt(event.maxTeamSize) || 1;
        if (currentMembers.length + 1 < maxSize) {
            onTeamMembersChange([...currentMembers, ""]);
        }
    };

    const handleRemoveMember = (e, index) => {
        e.stopPropagation();
        onTeamMembersChange(teamMembers.filter((_, i) => i !== index));
    };

    const handleNameChange = (e, index) => {
        const newMembers = [...teamMembers];
        newMembers[index] = e.target.value;
        onTeamMembersChange(newMembers);
    };

    return (
        <div
            className={`${classes.eventCard} ${classes.eventCardVertical} ${isSelected ? classes.eventCardSelected : ''} `}
            onClick={onClick}
        >
            <div className={classes.eventCardContent}>
                <div className={classes.checkboxContainer}>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className={classes.checkbox}
                    />
                    <span className={classes.checkmark}></span>
                </div>
                <div className={classes.eventDetails}>
                    <h3 className={classes.eventName}>{event.name}</h3>
                    <div className={classes.eventPriceContainer}>
                        <p className={classes.eventPrice}>₹{event.price} <span className={classes.perPersonText}>{event.isTeam ? '/ person' : ''}</span></p>
                    </div>
                </div>
            </div>

            {/* Smooth Expansion for Dynamic Team Input */}
            <div className={`${classes.teamSizeWrapper} ${isSelected && event.isTeam ? classes.teamSizeExpanded : ''} `}>
                <div className={classes.teamSizeInner}>
                    <label className={classes.teamLabel}>Team Members (Max: {event.maxTeamSize})</label>
                    <div className={classes.membersList}>
                        {teamMembers?.map((name, index) => (
                            <div key={index} className={classes.memberInputRow}>
                                <input
                                    type="text"
                                    placeholder={`Member ${index + 2} Name`}
                                    value={name}
                                    onChange={(e) => handleNameChange(e, index)}
                                    onClick={handleInputClick}
                                    className={classes.teamInput}
                                />
                                <button
                                    type="button"
                                    className={classes.removeMemberBtn}
                                    onClick={(e) => handleRemoveMember(e, index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    {(!teamMembers || teamMembers.length + 1 < (parseInt(event.maxTeamSize) || 1)) && (
                        <button
                            type="button"
                            className={classes.addMemberBtn}
                            onClick={handleAddMember}
                        >
                            + Add Team Member
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
