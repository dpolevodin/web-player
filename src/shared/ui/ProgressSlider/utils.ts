const SECONDS_IN_HOUR = 3600;

export const formatToSeconds = (value?: number) => {
  if (!value) {
    return;
  }

  const formattedSeconds = new Date(value * 1000).toISOString();

  return value < SECONDS_IN_HOUR
    ? formattedSeconds.substring(14, 19)
    : formattedSeconds.substring(11, 19);
};
