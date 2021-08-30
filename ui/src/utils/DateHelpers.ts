import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export class DateHelpers {
	public static formatPostDate(date?: string | number | Date) {
		return dayjs(date).format("MMMM Do YYYY");
	}
}
