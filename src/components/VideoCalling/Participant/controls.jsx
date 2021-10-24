import React from "react";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import CallEndIcon from "@material-ui/icons/CallEnd";

// interface Props {
//   onClick: (arg?: boolean, type?: string) => void;
//   type: string;
// }

const TrackIcon = React.memo(({ onClick, type }) => {
  const [isTrackOn, setTrack] = React.useState(true);
  const handleClick = () => {
    if (type === "disconnect") {
      onClick();
    } else {
      onClick(isTrackOn, type);
      setTrack(!isTrackOn);
    }
  };

  if (type === "data") {
    return null;
  }

  return (
    <div
      className={`icon ${!isTrackOn && "icon-disabled-video"} ${
        type === "disconnect" && "icon-disconnect"
        }`}
      onClick={handleClick}
    >
      {type === "disconnect" ? (
        <CallEndIcon />
      ) : isTrackOn ? (
        type === "audio" ? (
          <MicIcon />
        ) : (
            <VideocamIcon />
          )
      ) : type === "audio" ? (
        <MicOffIcon />
      ) : (
              <VideocamOffIcon />
            )}
    </div>
  );
});

export default TrackIcon;
