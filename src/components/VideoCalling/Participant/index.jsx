import React from "react";
import TrackComponent from "../Track";
import Controls from "./controls";
import { getTracks } from "../utils";

// interface Track {
//   kind: string;
// }

// interface Participant {
//   identity: "String";
//   tracks: Track;
//   on: (event: string, func: (e: string) => void) => void;
//   removeAllListeners: () => void;
// }

// interface Props {
//   localParticipant: boolean;
//   participant: Participant;
//   leaveRoom?: () => void;
// }

const ParticipantComponent = React.memo(
	({ localParticipant, participant, leaveRoom }) => {
		const [tracks, setTracks] = React.useState(getTracks(participant));
		const addTrack = (track) => {
			setTracks((previousTracks) => [...previousTracks, track]);
		};

		const removeTrack = (track) => {
			setTracks((previousTracks) =>
				previousTracks.filter((p) => p != track)
			);
		};

		React.useEffect(() => {
			if (!localParticipant) {
				participant.on("trackSubscribed", (track) => addTrack(track));
				participant.on("trackUnsubscribed", (track) =>
					removeTrack(track)
				);
			}
			return () => {
				setTracks([]);
				participant.removeAllListeners();
			};
		}, [localParticipant, participant]);

		const toggleTrack = (trackState, type) => {
			let track = tracks.find((e) => e.kind === type);

			if (track) {
				if (!trackState) {
					track.enable();
				} else {
					track.disable();
				}
			}
		};

		const renderTrack = (track, index) => (
			<TrackComponent
				localParticipant={localParticipant}
				key={index}
				track={track}
			/>
		);

		const renderControls = (track, index) => (
			<Controls type={track.kind} onClick={toggleTrack} />
		);
		return (
			<div className="participant">
				<div className="identity">{participant.identity}</div>
				{tracks.map(renderTrack)}
				{localParticipant ? (
					<div className="icon-component">
						{tracks.map(renderControls)}
						<Controls type="disconnect" onClick={leaveRoom} />
					</div>
				) : null}
			</div>
		);
	}
);

export default ParticipantComponent;
