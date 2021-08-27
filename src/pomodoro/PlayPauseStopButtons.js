import React from "react";
import classNames from "../utils/class-names";

function PlayPauseStopButtons({ playPauseHandler, stopHandler, play, pause }) {
    return (
     <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPauseHandler}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": pause,
                  "oi-media-pause": !pause,
                })}
              />
            </button>
                           
           {/* TODO: Disable the stop button when there is no active session */}                
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={stopHandler}
              disabled={!play}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
     </div>
    )
}

export default PlayPauseStopButtons;
