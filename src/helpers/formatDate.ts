export const formatDate = (dateString: string | Date) => {
  // console.log(dateString);
  return new Date(dateString).toISOString().split('T')[0];
};
