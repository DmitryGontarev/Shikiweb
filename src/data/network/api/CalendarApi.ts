import {CalendarModel} from "../../models/calendar/CalendarModel";
import {getAxiosRequest} from "../axios/AxiosForApp";

///////////////////////////////////////////////////////////////////////////
/** API для получения данных о дате выпуска аниме */
///////////////////////////////////////////////////////////////////////////

/**
 * Получение списка с графиком выхода эпизодов
 */
export async function getCalendar(): Promise<CalendarModel[]> {

    const response = await getAxiosRequest<CalendarModel[]>({url: '/api/calendar'})

    return response.data
}