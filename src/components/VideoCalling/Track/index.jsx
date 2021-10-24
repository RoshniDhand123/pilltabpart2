import React from "react";
import DataTrack from "./dataTrack";

// interface Track {
//   kind: string;
// }

// interface Props {
//   track: Track;
//   localParticipant: boolean;
// }

const TrackComponent = React.memo(({ track, localParticipant }) => {
	const videoRef = React.useRef();
	const audioRef = React.useRef();
	React.useEffect(() => {
		if (track.kind === "video") {
			track.attach(videoRef.current);
		} else if (track.kind === "audio") {
			track.attach(audioRef.current);
		}
	});
	return (
		<div className="track">
			{track.kind === "video" ? (
				<video
					ref={videoRef}
					autoPlay={true}
					className={
						localParticipant ? "video-local" : "video-remote"
					}
				/>
			) : track.kind === "audio" ? (
				<audio ref={audioRef} autoPlay={true} />
			) : (
				<DataTrack track={track} />
			)}
		</div>
	);
});

export default TrackComponent;
