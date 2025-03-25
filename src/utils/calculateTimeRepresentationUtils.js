import { getClientRemInPixels } from "./clientInfoUtils";

export function calculateOneHourRepresentationInPixels(timeLineSize) {
  if (!timeLineSize || timeLineSize <= 0) timeLineSize = 2;

  const clientRemInPixels = getClientRemInPixels();

  const oneHoureRepresentationInPixels = clientRemInPixels * timeLineSize;

  return oneHoureRepresentationInPixels;
}
