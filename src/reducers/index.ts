import { SET_ITEM_TO_DATASET_REDUCER } from "../types";
import initialState from "./initialState";

const debug = false;

const itemToDataset = (state: any, action: any) => {
  let { data, dataset_name, options = { key: "" } } = action;

  if (!dataset_name) state = { ...state, ...data };
  else if (!!options["key"]) state[dataset_name][options.key] = data;
  else state[dataset_name] = data;

  state = { ...state };
  return state;
};

const itemToDatasetList = (state: any, action: any) => {
  let { data, dataset_name } = action;

  if (!Array.isArray(data)) data = [data];

  for (let item of data)
    if (!!item.id && !!state[dataset_name]) state[dataset_name][item.id] = item;
  state = { ...state };
  return state;
};

const multipleItemsToDataset = (state: any, action: any) => {
  for (let act of action["actions"]) state = datasetHandler(state, act);

  return state;
};

const datasetHandler = (state: any, action: any) => {
  //console.log('datasetHandler ===> ', action)
  let { multiple, replaceList } = action["options"];

  if (multiple) state = multipleItemsToDataset(state, action);
  else if (replaceList) state = itemToDataset(state, action);
  else state = itemToDatasetList(state, action);

  return state;
};

const datasetReducer = (state = initialState, action: any) => {
  if (debug) console.log("REDUCERS - datasetReducer ===> ", { action });
  //throw 'REDUCER FETCH NAME IS REQUIRED'
  switch (action.type) {
    case SET_ITEM_TO_DATASET_REDUCER:
      state = datasetHandler(state, action);
      break;
  }
  return state;
};

//export default Reducer(datasetReducer)
export default datasetReducer;
