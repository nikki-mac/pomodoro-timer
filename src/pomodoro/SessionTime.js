import React from "react";
import {secondsToDuration, minutesToDuration} from "../utils/duration";

function SessionTime({ typeOfSession, timeInSession, timeLeft }) {
    
    const sessionLabel = typeOfSession === 'focus' ? 'Focusing' : 'On Break';
    const sessionDuration = minutesToDuration(timeLeft)
    const countdown = secondsToDuration(timeLeft * 60 - timeInSession)


return (
    <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {sessionLabel} for {sessionDuration} minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {countdown} remaining
            </p>
          </div>
    </div>
);
}

export default SessionTime;