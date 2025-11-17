import dayjs from 'dayjs';

export const getTrackingId = () => {
  const formatted = dayjs().format('YYYYMMDD');
  const trackingId = `ORDER-${formatted}-${Math.random() * 1000}`;
  return trackingId;
};
