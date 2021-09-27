export const textTruncate = (text: string, truncateNumber: number) =>
  text.length > truncateNumber ? `${text.slice(0, truncateNumber)}...` : text;

export const ListToObjectList = (data: Array<any> = []): Object => {
  let obj: any = {};
  data.forEach((item) => {
    obj[item.id] = item;
  });
  return obj;
};
