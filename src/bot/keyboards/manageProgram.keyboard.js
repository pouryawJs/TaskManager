const { Markup } = require("telegraf");
const jalaali = require("jalaali-js");

//* Get past dates in jalaali format
function toJalaaliDate(date) {
	const { jy, jm, jd } = jalaali.toJalaali(date);
	const month = String(jm).padStart(2, "0");
	const day = String(jd).padStart(2, "0");
	return `${jy}/${month}/${day}`;
}

const getPast28Days = () => {
	const today = new Date();
	const days = [];
	for (let i = 1; i <= 28; i++) {
		const d = new Date(today);
		d.setDate(d.getDate() - i);
		days.push(toJalaaliDate(d));
	}

	return days;
};

const buildPastDaysKeyboard = (page = 1, count = 7) => {
	const pastDays = getPast28Days();
	const start = (page - 1) * count;
	const end = start + count;
	const daysToShow = pastDays.slice(start, end);

	let rowDateLimit = 2; // Limit of dates per row
	let rowDateCounter = 0; // Counter for dates in the current row
	let currentRow = []; // Current row of buttons

	const buttons = [];

	daysToShow.forEach((day) => {
		currentRow.push(Markup.button.callback(day, `DAY_${day}`));
		rowDateCounter++;
		if (buttons.length === 3) {
			buttons.push(currentRow);
		}
		if (rowDateCounter === rowDateLimit) {
			buttons.push(currentRow);
			currentRow = [];
			rowDateCounter = 0;
		}
	});

	const controls = [];
	if (page > 1)
		controls.push(
			Markup.button.callback("قبلی ⬅️", `PAST_DAYS_PAGE_${page - 1}`)
		);
	if (end < pastDays.length)
		controls.push(
			Markup.button.callback("➡️ بعدی", `PAST_DAYS_PAGE_${page + 1}`)
		);
	buttons.push(controls);
	buttons.push([Markup.button.callback("⬅️ برگشت", "PROGRAM_MANAGEMENT")]);

	return buttons;
};

const buildTaskTagsKeyboard = (tasks) => {
	let rowTagLimit = 3; // Limit of tags per row
	let rowTagCounter = 0; // Counter for dates in the current row
	let currentRow = []; // Current row of buttons

	const buttons = [];

	tasks.forEach((task) => {
		const tag = task._id.toString().slice(-4);
		currentRow.push(
			Markup.button.callback(tag, `TASK_DELETE_${task._id.toString()}`)
		);
		rowTagCounter++;
		if (rowTagCounter === rowTagLimit) {
			buttons.push(currentRow);
			currentRow = [];
			rowTagCounter = 0;
		}
	});
	if (currentRow.length) {
		buttons.push(currentRow);
		currentRow = [];
	}
	buttons.push([Markup.button.callback("⬅️ برگشت", "TODAY_TASKS")]);

	return buttons;
};

exports.mainManageProgramMenu = () =>
	Markup.inlineKeyboard([
		[
			Markup.button.callback("📆 روز های گذشته", "PAST_DAYS_PAGE_1"),
			Markup.button.callback("🗒 برنامه امروز ", "TODAY_TASKS"),
		],
		[Markup.button.callback("📊 بررسی عملکرد", "ANALYS_TASKS")],
		[Markup.button.callback("⬅️ برگشت", "MAIN_MENU")],
	]);

exports.todayTasks = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("➕✍️ افزودن تسک جدید", "ADD_TASK")],
		[Markup.button.callback("🗑 حذف تسک", "DELETE_TASK")],
		[Markup.button.callback("⬅️ برگشت", "PROGRAM_MANAGEMENT")],
	]);

exports.addTask = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("⬅️ برگشت", "TODAY_TASKS")],
	]);

exports.deleteTask = (tasks) => {
	const buttons = buildTaskTagsKeyboard(tasks);

	return Markup.inlineKeyboard(buttons);
};

exports.analysTasks = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("⬅️ برگشت", "PROGRAM_MANAGEMENT")],
	]);

exports.pastDays = (page = 1) => {
	const buttons = buildPastDaysKeyboard(page, 7);
	return Markup.inlineKeyboard(buttons);
};

exports.startedTask = (taskID) =>
	Markup.inlineKeyboard([
		[Markup.button.callback("شروع فعالیت ✅", `PROGRESS_TASK_${taskID}`)],
		[Markup.button.callback("لغو تسک ⛔️", `CANCEL_TASK_${taskID}`)],
	]);

exports.InProgressTask = (taskID) =>
	Markup.inlineKeyboard([
		[Markup.button.callback("✅ تکمیل شد", `DONE_TASK_${taskID}`)],
		[
			Markup.button.callback(
				"⚡ نیمه‌تمام ماند",
				`HALF_DONE_TASK_${taskID}`
			),
		],
		[Markup.button.callback("🚫 انجام ندادم", `NOT_DONE_TASK_${taskID}`)],
	]);

exports.pastDayInformation = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("⬅️ برگشت", "PAST_DAYS_PAGE_1")],
	]);
