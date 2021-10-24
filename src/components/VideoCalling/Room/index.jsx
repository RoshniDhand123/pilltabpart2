import React from "react";
import ParticipantComponent from "../Participant";
import { getTracks } from "../utils";
import Button from "../../button";
// import InputField from "../../FieldComponent";
import { useSnackbar } from "notistack";
import { Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MessageIcon from "@material-ui/icons/Message";
//import { TextField } from "@material-ui/core";

// interface Track {
//   kind: string;
// }

// interface Participant {
//   identity: "String";
//   tracks: Track;
//   on: (event: string, func: (e) => void) => void;
//   removeAllListeners: () => void;
// }

// interface Room {
//   participants: Participant[];
//   localParticipant: Participant;
//   disconnect: () => void;
//   on: (event: string, func: (e) => void) => void;
// }

// interface Props {
//   disconnect: () => void;
//   room: Room;
//   buttonCss: string;
// }

const useStyles = makeStyles((theme) => ({
	typography: {
		position: "relative",
		padding: theme.spacing(2),
		height: "93%",
		fontSize: "18px",
		[theme.breakpoints.down(400)]: {
			fontSize: "48px",
		},
		[theme.breakpoints.between(400, 600)]: {
			fontSize: "32px",
		},
	},
	button: {
		display: "block",
		float: "right",
	},
}));

let msgArray = [];

export const storeMessage = (message) => {
	msgArray.push(message);
};
const RoomComponent = React.memo(({ disconnect, room, buttonCss }) => {
	const [value, setValue] = React.useState();
	const [remoteParticipants, setParticipants] = React.useState(
		Array.from(room.participants.values())
	);
	const { enqueueSnackbar } = useSnackbar();
	const [msgHistory, setMsgHistory] = React.useState([]);
	const [anchorEl, setAnchorEl] = React.useState();

	React.useEffect(() => {
		if (room) {
			room.on("participantConnected", (participant) =>
				addParticipant(participant)
			);
			room.on("participantDisconnected", (participant) =>
				removeParticipant(participant)
			);

			// 	const localParticipant = room.localParticipant;
			// 	console.log(
			// 		`Connected to the Room as LocalParticipant "${localParticipant.identity}"`
			// 	);

			// 	// Log any Participants already connected to the Room
			// 	room.participants.forEach((participant) => {
			// 		console.log(
			// 			`Participant "${participant.identity}" is connected to the Room`
			// 		);
			// 	});

			// 	// Log new Participants as they connect to the Room
			// 	room.once("participantConnected", (participant) => {
			// 		console.log(
			// 			`Participant "${participant.identity}" has connected to the Room`
			// 		);
			// 	});

			// 	// Log Participants as they disconnect from the Room
			// 	room.once("participantDisconnected", (participant) => {
			// 		console.log(
			// 			`Participant "${participant.identity}" has disconnected from the Room`
			// 		);
			// 	});
			//this.timer = setInterval(this.filterArrayList, 1000);
		}

		window.addEventListener("beforeunload", disconnect);
		return () => {
			leaveRoom();
		};
	}, [room]);

	// {
	// 	remoteParticipants.map((participant) => {
	// 		participant.on("trackAdded", (track) => {
	// 			// console.log(
	// 			// 	`Participant "${participant.identity}" added ${track.kind} Track ${track.sid}`
	// 			// );
	// 			if (track.kind === "data") {
	// 				track.on("message", (data) => {
	// 					console.log("check....msg", data);
	// 					msgArray.push(data);
	// 				});
	// 			}
	// 		});
	// 	});
	// }

	const addParticipant = (participant) => {
		setParticipants((prevParticipants) => [
			...prevParticipants,
			participant,
		]);
	};

	const removeParticipant = (participant) => {
		setParticipants((prevParticipants) =>
			prevParticipants.filter((p) => p.identity !== participant.identity)
		);
	};

	const leaveRoom = () => {
		room.disconnect();
		disconnect();
	};

	const renderParticipants = (participant, index) => (
		<ParticipantComponent
			localParticipant={false}
			key={index}
			participant={participant}
		/>
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		let tracks = getTracks(room.localParticipant);
		let dataTracks = tracks.find((ele) => ele.kind === "data");
		const message = `${room.localParticipant.identity} : ${value}`;
		dataTracks.send(message);
		enqueueSnackbar(message);
		setValue("");
		msgArray.push(message);
		msgArray.map((list) => {
			console.log("msg", list);
		});
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const classes = useStyles();
	return (
		<div className="room">
			<div className="msgContainer">
				<ParticipantComponent
					localParticipant
					participant={room.localParticipant}
					leaveRoom={leaveRoom}
				/>
				<div className="chatIcon">
					<IconButton onClick={handleClick}>
						<MessageIcon />
					</IconButton>
				</div>				
				<Popover
					id={"simplePopOver"}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "center",
						horizontal: "right",
					}}
				>
					<Typography className={classes.typography}>
						<div className="closeButtonContainer">
							Participants Chat
							<IconButton
								className={classes.button}
								onClick={handleClose}
							>
								<CloseIcon />
							</IconButton>
						</div>
						<div className="chatContainer">
							{msgArray.map((list) => {
								return <div className="chatList">{list}</div>;
							})}
						</div>
						<div className="ChatFormContainer">
							<form onSubmit={handleSubmit} className="chatForm">
								<input
									required={true}
									variant="Dark"
									placeholder="Enter message..."
									onChange={handleChange}
									value={value}
									className="chatInputField"
								/>
								<Button
									btnText="Send"
									variant="contained"
									className={` msgSendButton`}
								/>
							</form>
						</div>
					</Typography>
				</Popover>
			</div>
			<div className="right-section">
				<div className="participant-column">
					{remoteParticipants.map(renderParticipants)}
				</div>
				{/* <form onSubmit={handleSubmit} className="chatComponent">
					<input
						required={true}
						variant="Dark"
						placeholder="Enter message..."
						onChange={handleChange}
						value={value}
						className="msgBox"
					/>					
					<Button
						btnText="Send"
						variant="contained"
						className={buttonCss}
					/>
				</form> */}
			</div>
		</div>
	);
});

export default RoomComponent;
