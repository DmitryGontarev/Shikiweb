import {UserBriefModel} from "../../models/user/UserBriefModel";
import {BaseResponse, getAxiosRequest} from "../axios/AxiosForApp";

///////////////////////////////////////////////////////////////////////////
/** Api для получения списка пользователей */
///////////////////////////////////////////////////////////////////////////

/**
 * Получить информацию по своему профилю пользователя
 */
export async function getCurrentUserBriefInfo(): Promise<BaseResponse<UserBriefModel>> {

    return await getAxiosRequest<UserBriefModel>({url: `/api/users/whoami`})
}