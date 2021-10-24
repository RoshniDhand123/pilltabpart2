export const getDuration = (startTime, endTime) => {
  let duration = endTime.getTime() - startTime.getTime();
  let hours = parseInt(duration / 3600000);
  let remainder = duration % 3600000;
  let minutes = parseInt(remainder / 60000);
  let remainderMinutes = remainder % 60000;
  let seconds = parseInt(remainderMinutes / 1000);
  let miliseconds = remainderMinutes % 1000;
  return hours + ":" + minutes + ":" + seconds + ":" + miliseconds;
};

export const getCallDetails = (startTime, endTime) => {
  let duration = getDuration(startTime, endTime);
  let callStartTime = startTime.toTimeString().split(" ")[0];
  let callEndTime = endTime.toTimeString().split(" ")[0];
  return {
    callStartTime,
    callEndTime,
    duration,
  };
};

export const getTracks = (participant) => {
  const allTracks = Array.from(participant.tracks.values());
  const existingTracks = allTracks.map((ele) => ele.track);
  const notNullTracks = existingTracks.filter((track) => track !== null);
  return notNullTracks;
};
