export const getStartTime = (date: string) => {
  const formatDate = new Date(date);
  formatDate.setHours(0,0,0,0);
  return formatDate.toJSON();
};
export const getEndTime = (date: string) => {
  const formatDate = new Date(date);
  formatDate.setHours(23, 59, 59, 999);
  return formatDate.toJSON();
};

export const convertToDate = (date: string)=>{
  const d = date.split("/");
  const formatDate = new Date(`${d[2]  }/${  d[1]  }/${  d[0]}`);
  return formatDate;     
}