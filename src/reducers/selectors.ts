const getDataset = (state: any, datasetName: string) => state[datasetName];

export const datasetSelector = (
  state: any,
  datasetName: string,
  {
    list_format = false,
    ids = null,
    id = null,
    expected_type = null,
    default_value = null,
  }: any = {}
) => {
  let selected_dataset = getDataset(state, datasetName);
  if (!!id) {
    if (!!selected_dataset[id]) selected_dataset = selected_dataset[id];
    else return null;
  }
  if (!!ids && Array.isArray(ids)) {
    let filtereds: any = {};
    for (let id of ids)
      if (!!selected_dataset[id]) {
        filtereds[id] = selected_dataset[id];
      }
    selected_dataset = filtereds;
  }
  if (list_format)
    selected_dataset = Object.keys(selected_dataset || []).map(
      (id) => selected_dataset[id]
    );

  if (!!expected_type && typeof selected_dataset !== expected_type)
    selected_dataset = null;

  if (selected_dataset === null || selected_dataset === undefined)
    selected_dataset = default_value;

  return selected_dataset;
};
