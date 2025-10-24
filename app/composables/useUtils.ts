export const formatMinutesToHM = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

export const formatDate = (
  isoDate: string,
  format: 'DD.MM' | 'DD.MM.YY' | 'DD.MM.YYYY',
): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const shortYear = year.toString().slice(-2);

  switch (format) {
  case 'DD.MM':
    return `${day}.${month}`;
  case 'DD.MM.YY':
    return `${day}.${month}.${shortYear}`;
  case 'DD.MM.YYYY':
    return `${day}.${month}.${year}`;
  default:
    throw new Error('Unsupported format');
  }
};

export const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
