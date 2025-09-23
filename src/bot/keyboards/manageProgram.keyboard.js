const { Markup } = require("telegraf");
const jalaali = require("jalaali-js");

//* Get past dates in jalaali format
const toJalaaliDate = (date) => {
	const jDate = jalaali.toJalaali(date);
	return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
};

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

//! NEED TO DEVELOPMENT
exports.deleteTask = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("⬅️ برگشت", "TODAY_TASKS")],
	]);

exports.analysTasks = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("⬅️ برگشت", "PROGRAM_MANAGEMENT")],
	]);

exports.pastDays = (page = 1) => {
	const buttons = buildPastDaysKeyboard(page, 7);
	return Markup.inlineKeyboard(buttons);
};
