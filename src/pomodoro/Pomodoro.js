import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import TimerControls from "./TimerControls";
import PlayPauseStopButtons from "./PlayPauseStopButtons";
import ActiveSessionDisplay from "./ActiveSessionDisplay";




function Pomodoro() {

  const initialState = {
    play: false,
    pause: true,
    typeOfSession: 'focus',
    timeInSession: 0,
    focus: 25,
    break: 5,
  };

  const timerRanges = {
    focus: [5, 60],
    break: [1, 15],
  }
  // The current session - null where there is no session running
  const [session, setSession] = useState(initialState);

  
  /* --ToDo: Allow the user to adjust the focus and break duration.
  called when + or - buttons are clicked for focus or break */
  function timerControlsHandler(plusOrMinus, sessionType) {
    const initialTime = session[sessionType];
    const range = timerRanges[sessionType];
    const timeIncrement = sessionType === 'focus' ? 5 : 1;
    const adjustedTime = plusOrMinus === 'plus' ? Math.min(initialTime + timeIncrement, range[1])
      : Math.max(initialTime - timeIncrement, range[0]);
    setSession((session) => ({
      ...session,
      [sessionType]: adjustedTime,
    }));
  }

  /**
   * Called whenever the play/pause button is clicked.
   */
    function playPauseHandler() {
    if (!session.pause) {
      const { typeOfSession } = session;
    }
    setSession((session) => ({
      ...session,
      pause: !session.pause,
      play: true,
    }));
  }

  /* --TODO: Implement stopping the current focus or break session.
     Called whenever the stop button is clicked */
  function stopHandler() {
    setSession((session) => ({
      ...initialState
    }));
  }

  
function timerCount() {
  const {typeOfSession, timeInSession} = session;
  const timeRemaining = session[typeOfSession] * 60 - timeInSession;
  setSession((session) => ({
    ...session,
    timeInSession: session.timeInSession + 1
  }));
}

/* Plays session end audio, and switches sessions 
from Focus to Break and from Break to Focus */  
function nextSession() {
  new Audio('https://bigsoundbank.com/UPLOAD/mp3/1830.mp3').play();
  const switchSession = session.typeOfSession === 'focus' ? 'break' : 'focus';
  setSession((session) => ({
    ...session,
    typeOfSession: switchSession,
    timeInSession: 0,
  }));
}

  
  function endSession() {
    return session.timeInSession === session[session.typeOfSession] * 60;
  }
  // console.log(session.typeOfSession)
  // console.log(session[session.typeOfSession])
  
  
  /**
   * Custom hook that invokes the callback function every second
   */
  useInterval(() => {
    if (endSession()) nextSession();
    else timerCount();
  },
    session.pause ? null : 1000
  );
  

  return (
    <div className="pomodoro">


      <TimerControls 
        timerControlsHandler={timerControlsHandler}
        disabled={session.play}
        sessionType={['focus', 'break']}
        time={[session.focus, session.break]}
      />

      <PlayPauseStopButtons 
        pause={session.pause}
        play={session.play}
        stopHandler={stopHandler}
        playPauseHandler={playPauseHandler}
      />

      <ActiveSessionDisplay 
        typeOfSession={session.typeOfSession}
        play={session.play}
        pause={session.pause}
        sessionTimes={[session.focus, session.break]}
        timeInSession={session.timeInSession}
      />        


    </div>
  );
}

export default Pomodoro;
