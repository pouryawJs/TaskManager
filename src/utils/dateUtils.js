exports.getTaskDurtationInMinute = (start, end) => {
	const [startHour, startMin] = start.split(":").map(Number);
	const [endHour, endMin] = end.split(":").map(Number);

	const startMinutes = startHour * 60 + startMin;
	const endMinutes = endHour * 60 + endMin;

	return endMinutes - startMinutes;
};

exports.getTehranTime = () => {
	const now = new Date();

	// return HH:MM
	return new Intl.DateTimeFormat("en-US", {
		timeZone: "Asia/Tehran",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(now);
};

exports.getCurrentTimeInMinute = () => {
	const time = this.getTehranTime();

	const [hour, minute] = time.split(":").map(Number);

	return hour * 60 + minute;
};
