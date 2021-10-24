import React from "react";
import { useSnackbar } from "notistack";
import { storeMessage } from "../Room";

// interface Track {
//   kind: string;
// }

// interface Props {
//   track: Track;
// }

const DataTrack = React.memo(({ track }) => {
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		const handleMessage = (message) => {
			enqueueSnackbar(message);
			storeMessage(message);
		};
		track.on("message", handleMessage);
		return () => {
			track.off("message", handleMessage);
		};
	}, [track, enqueueSnackbar]);
	return null;
});

export default DataTrack;
