import ajax from "./ajax";

import { SEARCH_URL } from "../constants/constants";

//按照选中的name搜索信息
export const reqSearch = (keyword, id) => ajax(SEARCH_URL + `/${keyword}/${id}`, {});