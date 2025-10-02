exports.pofile = (
	totalScore,
	doneLen,
	halfDoneLen,
	notDoneLen,
	canceledLen,
	endTime
) => {
	return `👤 <b>پروفایل کاربری</b>

⭐ <b>امتیاز فعلی:</b> ${totalScore}

📝 <b>وضعیت تسک‌ ها</b>

   ✅ تکمیل شده: ${doneLen}
   ⚠️ نیمه‌ تمام: ${halfDoneLen}
   ❌ انجام‌ نشده: ${notDoneLen}
   🚫 لغو شده: ${canceledLen}

   📌 مجموع کل: ${doneLen + halfDoneLen + notDoneLen + canceledLen}

⏰ <b>ساعت پایان روز:</b> ${endTime}

⚙️ برای تغییر ساعت پایان روز، گزینه زیر را انتخاب کنید 👇
`;
};
