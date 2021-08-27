import React from "react";
import SessionTime from "./SessionTime";
import ProgressBar from "./ProgressBar";

 /* Displays when there is an active focus or break session only (playing or paused) */ 

function ActiveSessionDisplay({ play, pause, typeOfSession, sessionTimes, timeInSession }) {
    if (!play) return null;

    const timeLeft = typeOfSession === 'focus' ? sessionTimes[0] : sessionTimes[1];
    const timerPaused = pause ? <h2>PAUSED</h2> : null;

    return (
        <>
            <SessionTime 
            timeLeft={timeLeft}
            timeInSession={timeInSession}
            typeOfSession={typeOfSession}
            />
            {timerPaused}
            <ProgressBar 
            timeInSession={timeInSession}
            timeLeft={timeLeft}
            />
        </>
    );
}

export default ActiveSessionDisplay;
