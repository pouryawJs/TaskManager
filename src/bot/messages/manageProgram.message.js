exports.mainManageProgramMenu = () => {
	return `
<b><i>📅 مدیریت برنامه</i></b>
اینجا میتونی به برنامه‌هات دسترسی داشته باشی و روند کاری‌ خودتو ببینی:

<b>1️⃣ برنامه امروز</b> : همه‌ی تسک‌هایی که <b>برای امروز</b> ثبت کردی اینجاست. (زمان پایان برنامه امروز بر اساس ساعت شروع روز شخصی شما حساب میشه)

<b>2️⃣ برنامه روزهای گذشته</b> : میتونی تاریخچه‌ تسک‌ های <b>یک ماه</b> گذشته رو مرور کنی.

<b>3️⃣ راهنما</b> : توضیحاتی درباره‌ی نحوه ثبت تسک، امتیازدهی و یادآوری‌ها.

<b>4️⃣ بررسی عملکرد</b> : نمایش نمودار عملکرد شما بر اساس <b>امتیازات</b> کسب شده.
`;
};

//* TODAY TASKS MESSAGES
const formatTasksListMessage = (tasks) => {
	if (!tasks || tasks.length === 0) {
		return "تسکی برای نمایش وجود ندارد.";
	}

	return tasks
		.map((task, index) => {
			const tagID = task._id.toString().slice(-4);
			return `<b>تسک شماره (${index + 1}) : #${tagID}</b>
🔹 <b>عنوان:</b> ${task.title || "-"}
⏰ <b>بازه زمانی:</b> ${task.start || "-"} تا ${task.end || "-"}
📌 <b>وضعیت فعلی:</b> ${task.status || "-"}`;
		})
		.join("\n\n");
};

exports.todayTasks = (tasks) => {
	const tasksList = formatTasksListMessage(tasks);
	return `
<b><i>📅 برنامه امروز</i></b>

در این بخش می‌تونی لیست تسک‌های امروزت رو ببینی.  
از گزینه‌های زیر برای مدیریت استفاده کن:

<b>1️⃣ افزودن تسک جدید</b> : وقتی کار تازه‌ای داری که باید به برنامه اضافه بشه.  
<b>2️⃣ حذف تسک</b> : برای حذف یک تسک از لیست تسک های امروز.

⬇️ لیست تسک‌ های امروزت:
${tasksList}
`;
};

exports.addTask = () => {
	return `
<b><i>➕ اضافه کردن تسک جدید</i></b>

برای ثبت تسک جدید، کافیه متن رو با این پترن بنویسی:

<b>(عنوان از HH:MM تا HH:MM)</b>

مثال‌ها:
1- مطالعه کتاب از 09:00 تا 10:30  
2- ورزش از 18:00 تا 19:00  

🔹 می‌تونی چند تسک رو همزمان توی چند خط وارد کنی:
مطالعه ریاضی از 09:00 تا 10:30  
ورزش از 18:00 تا 19:00  
خرید از 20:00 تا 20:30  

بات به صورت خودکار تسک‌هاتو می‌شناسه و به لیست امروز اضافه می‌کنه ✅

‼️<b> توجه : لطفا پس از تکمیل فرایند ثبت تسک ها دکمه برگشت را فشار دهید </b>‼️
`;
};

exports.deleteTask = (tasks) => {
	const tasksList = formatTasksListMessage(tasks);
	return `
<b><i>🗑️ حذف تسک</i></b>

تسک‌ های امروزت به ترتیب زمان شروع مرتب شدن 👇  
هر کدوم یک شماره داره.  

برای حذف، فقط شماره‌ی تسک رو از لیست انتخاب کن و روی دکمه شیشه ای که با شماره تسک انتخابیت یکسان هست کلیک کن  .  

⬇️ لیست تسک‌ های امروزت:
${tasksList}
`;
};

exports.addTaskFormatErr = () => {
	return `فرمت ورودی اشتباه است❌

💡لطفا دوباره و با فرمت صحیح زیر وارد کنید:
<code>عنوان تسک + از + ساعت شروع(مثال :07:01) + تا + ساعت پایان(مثال: 13:05)</code>
`;
};
exports.addTaskInsertionErr = () => {
	return `❌ به علت اختلال در سرور تسک ها ثبت نشدند، لطفا دوباره ارسال کنید 🙏`;
};

exports.addTaskSuccess = (taskCount) => {
	return `✅ ${
		taskCount > 1 ? "تسک های" : "تسک"
	} موردنظر با موفقیت به لیست اضافه ${taskCount > 1 ? "شدند" : "شد"}.

💡برای خروج و مشاهده بر روی گزینه "برگشت ⬅️" کلیک کنید.`;
};
//* Manage The Task
exports.startedTask = (task, duration) => `
<b>🟢 تسک «${task.title}» شروع شد!</b>

<b>⏳ مدت زمان:</b> ${duration} دقیقه
<b>⏰ زمان پایان:</b> ${task.end}

برای به‌روزرسانی وضعیت لطفاً یکی از گزینه‌های زیر رو انتخاب کن:
`;

exports.InProgressTask = (task, duration) => `
<b>🔥 تسک «${task.title}» در حال انجام است...</b>

<b>🕒 زمان شروع:</b> ${task.start}
<b>⏰ زمان پایان:</b> ${task.end}
<b>⏳ مدت زمان:</b> ${duration} دقیقه

لطفاً در پایان یا هر زمان مناسب یکی از وضعیت‌ها را انتخاب کن:

‼️توجه: اگر تا <b>15 دقیقه</b> بعد از پایان بازه هیچ وضعیت نهایی ثبت نشود، وضعیت به صورت خودکار روی <b>نیمه‌تمام</b> قرار داده خواهد شد.
`;

//* PAST TASKS MESSAGES
const reportTemplate = (date, totalScore, done, halfDone, notDone) => {
	return `
📅 <b>تاریخ روز:</b> ${date}
⭐ <b>مجموع امتیازات کسب‌شده:</b> ${totalScore}

✅ <b>تسک‌های انجام‌شده</b> (${done.length})
${done.map((t, i) => `${i + 1}- ${t.title}`).join("\n") || "—"}

⚠️ <b>تسک‌های نیمه‌تمام</b> (${halfDone.length})
${halfDone.map((t, i) => `${i + 1}- ${t.title}`).join("\n") || "—"}

❌ <b>تسک‌های انجام‌نشده</b> (${notDone.length})
${notDone.map((t, i) => `${i + 1}- ${t.title}`).join("\n") || "—"}

`;
};

exports.pastDays = () => {
	return `📅 <b><i>روزهای گذشته</i></b>

برای دیدن گزارش هر روز، اول تاریخ مورد نظرت رو از لیست زیر انتخاب کن 👇 `;
};
exports.notFoundTask = (date) => `📅 <b>تاریخ روز:</b> ${date}


❌ هیچ تسکی برای شما در این روز وجود ندارد
`;

exports.tasksByDay = (date, totalScore, done, halfDone, notDone) => {
	const reportMsg = reportTemplate(date, totalScore, done, halfDone, notDone);
	return reportMsg;
};
//* GUIDE TASKS MESSAGES

//* ANALYS TASKS MESSAGES
exports.analysTasks = () => {
	return `
<b><i>📊 عملکرد و آنالیز</i></b>

این بخش در دست توسعه است`;
};
