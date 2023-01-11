const parseDate = (date: string) => {
    const dateObj = new Date(date);
    return ((dateObj.getMonth() + 1) + "/" + (dateObj.getUTCDate()) + "/" + (dateObj.getFullYear()-2000));
  }

export default parseDate;