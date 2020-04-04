export const formatTime = (time: Date): string => {
  const tempDate = new Date(time);
  const year = tempDate.getFullYear();
  const month = tempDate.getMonth() + 1;
  const data = tempDate.getDate();
  return `${year}年-${month}月- ${data}`;
};
