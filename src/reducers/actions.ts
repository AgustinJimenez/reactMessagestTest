import { SET_ITEM_TO_DATASET_REDUCER } from "../types";
import { ListToObjectList } from "../utils";

export const setDatasetToReducer = (
  data: any,
  dataset_name: string,
  options = { key: "" }
) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data,
  options: { ...options, replaceList: true, multiple: false },
});

export const setDatasetListToReducer = (
  dataList: object | [],
  dataset_name: string,
  options = {}
) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data: dataList,
  options: { ...options, replaceList: false, multiple: false },
});

export const setDatasetListToObjectReducer = (
  data: any,
  dataset_name: string,
  options = {}
) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  dataset_name,
  data: ListToObjectList(data),
  options: { ...options, replaceList: true, multiple: false },
});

export const setMultipleDatasetsToReducer = (actions = {}) => ({
  type: SET_ITEM_TO_DATASET_REDUCER,
  actions,
  options: { multiple: true },
});
