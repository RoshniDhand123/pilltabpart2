import React, { useState, useEffect } from "react";
import Room from "./Room";
import Button from "../button";
import "./index.scss";
import { getCallDetails, getTracks } from "./utils";
import { SnackbarProvider } from "notistack";
import {
	getVideoToken_RoomName,
	updatePatientCallDetail,
} from "../../services/apis/index";
import { parseRoom_TokenValue } from "../../services/helper";
//import {Link} from "react-router";

const { connect, LocalDataTrack, createLocalTracks } = require("twilio-video");

var startTime = new Date();
var endTime = new Date();
const dataTrack = new LocalDataTrack();

// interface Props {
// 	identity: string;
// 	buttonCss: string;
// 	btnText: string;
// }

// interface CallDetails {
// 	callStartTime: string;
// 	callEndTime: string;
// 	duration: string;
// }
let detail = { room: "", token: "" };

const VideoChatRoom = React.memo(({ identity, btnText, buttonCss, method }) => {
	const [tracks, setTracks] = useState(null);
	const [room, setRoom] = useState(null);
	const [failed, setFailed] = useState(false);
	const [callDetails, setCallDetails] = useState();

	useEffect(() => {
		getToken_RoomName();
	}, []);
	const getToken_RoomName = async () => {
		let nurseId = JSON.parse(localStorage.getItem("nurseId"));
		let requestId = JSON.parse(localStorage.getItem("patientId"));
		let resp;
		//console.log("nurseId", nurseId, requestId);
		// if (identity != "nurse") {
		// 	resp = await updatePatientCallDetail(identity);
		// } else {
		const payload = {
			nurse_id: nurseId,
			patient_id: requestId,
			//url: "http//:localhost:3000/videoCalling",
		};		
		resp = await getVideoToken_RoomName(payload);
		//}	
		if (resp.data && resp.data.status) {
			detail = parseRoom_TokenValue(resp.data);
			joinRoom();
		} else {
			method.method();
		}
	};

	const joinRoom = async () => {
		try {
			const tracks = await createLocalTracks();
			// const response = await fetch(
			// `https://{your-endpoint}?identity=${identity}`
			// );
			// const data = await response.json();

			// const data = {
			// 	accessToken:
			// 		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2YzZGNjYWQ4ZDc0YjQxNWE5YzA3ZGY3YjE5MmVlMjQyLTE2MjIxMjI5MzYiLCJpc3MiOiJTS2YzZGNjYWQ4ZDc0YjQxNWE5YzA3ZGY3YjE5MmVlMjQyIiwic3ViIjoiQUNkYzE2NjZiZWRkYWNmZmQ1ZDAxN2M2YjlkNjQ1MmJkOSIsImV4cCI6MTYyMjEyNjUzNiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYW5raXRhIiwidmlkZW8iOnsicm9vbSI6InVzZXIifX19.t_bZtLyspaCVpJtR_hzVsCAvLXY4Mhfy7Y0W0ZOw8tY",
			// };
			const room = await connect(detail.token, {
				name: detail.room,
				tracks: [...tracks, dataTrack],
			});

			setTracks(tracks);
			console.log("tracks", tracks);
			console.log("room", room);
			startTime = new Date();
			localStorage.setItem("room", JSON.stringify(room));
			setRoom(room);
		} catch (err) {
			console.log(err);
			setFailed(true);
		}
	};

	const disconnect = () => {
		endTime = new Date();
		tracks.map((track) => {
			track.stop();
			track.detach().forEach((element) => element.remove());
		});

		setRoom(null);
		let callDetails = getCallDetails(startTime, endTime);
		setCallDetails(callDetails);
		method.method(callDetails);
	};

	// if (failed) {
	// 	return <div>Failed Connection!Token Expired.</div>;
	// }
	return (
		<div className="video-call-component">
			{room != null ? (
				<Room
					disconnect={disconnect}
					buttonCss={buttonCss}
					room={room}
				/>
			) : (
				<></>
				// <>
				// 	<Button
				// 		btnText={btnText}
				// 		className="btnStyle"
				// 		onClick={joinRoom}
				// 	/>
				// callDetails && (
				// 	<>
				// 		<div>Call start time: {callDetails.callStartTime}</div>
				// 		<div>Call end time: {callDetails.callEndTime}</div>
				// 		<div>Call duration: {callDetails.duration}</div>
				// 	</>
				// )
				//</>
			)}
		</div>
	);
});

const VideoCall = (method, identity) => {
	return (
		<SnackbarProvider
			maxSnack={8}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			autoHideDuration={10000}
			variant="info"
		>
			<VideoChatRoom
				identity="abc"
				btnText="Start Video Call"
				buttonCss="buttonStyle"
				method={method}
				identity={identity}
			/>
		</SnackbarProvider>
	);
};

export default VideoCall;

// const roomObject = {
//   mediaRegion: "us1",
//   state: "connected",
//   sid: "RM691a51ac8e3959277d8dd5d191bfb38c",
//   participants: {},
//   name: "Project1",
//   localParticipant: {
//     signalingRegion: "in1",
//     videoTracks: {
//       MT44770f0c69d6e53fa91798b6eac0aa07: {
//         track: {
//           isStopped: false,
//           isEnabled: true,
//           id: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//           processor: null,
//           dimensions: { height: 480, width: 640 },
//           processedTrack: null,
//           mediaStreamTrack: {},
//           isStarted: true,
//           name: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//           kind: "video",
//         },
//         priority: "standard",
//         kind: "video",
//         isTrackEnabled: true,
//         trackSid: "MT44770f0c69d6e53fa91798b6eac0aa07",
//         trackName: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//       },
//     },
//     tracks: {
//       MT177ad8a95980de70640d55d33f1b4875: {
//         track: {
//           isStopped: false,
//           isEnabled: true,
//           id: "54f4a150-343a-4875-a414-1568aab197d6",
//           processedTrack: null,
//           mediaStreamTrack: {},
//           isStarted: true,
//           name: "54f4a150-343a-4875-a414-1568aab197d6",
//           kind: "audio",
//         },
//         priority: "standard",
//         kind: "audio",
//         isTrackEnabled: true,
//         trackSid: "MT177ad8a95980de70640d55d33f1b4875",
//         trackName: "54f4a150-343a-4875-a414-1568aab197d6",
//       },
//       MT44770f0c69d6e53fa91798b6eac0aa07: {
//         track: {
//           isStopped: false,
//           isEnabled: true,
//           id: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//           processor: null,
//           dimensions: { height: 480, width: 640 },
//           processedTrack: null,
//           mediaStreamTrack: {},
//           isStarted: true,
//           name: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//           kind: "video",
//         },
//         priority: "standard",
//         kind: "video",
//         isTrackEnabled: true,
//         trackSid: "MT44770f0c69d6e53fa91798b6eac0aa07",
//         trackName: "97bd9eb9-1452-434e-98cc-dc15151c744d",
//       },
//     },
//     state: "connected",
//     sid: "PA2ec8ffc6e417b3ce7ca56528c67f4214",
//     networkQualityStats: null,
//     networkQualityLevel: null,
//     identity: "Archna",
//     dataTracks: {},
//     audioTracks: {
//       MT177ad8a95980de70640d55d33f1b4875: {
//         track: {
//           isStopped: false,
//           isEnabled: true,
//           id: "54f4a150-343a-4875-a414-1568aab197d6",
//           processedTrack: null,
//           mediaStreamTrack: {},
//           isStarted: true,
//           name: "54f4a150-343a-4875-a414-1568aab197d6",
//           kind: "audio",
//         },
//         priority: "standard",
//         kind: "audio",
//         isTrackEnabled: true,
//         trackSid: "MT177ad8a95980de70640d55d33f1b4875",
//         trackName: "54f4a150-343a-4875-a414-1568aab197d6",
//       },
//     },
//   },
//   isRecording: false,
//   dominantSpeaker: null,
// };
