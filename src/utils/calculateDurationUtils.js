export function calculateDurationInHours(
  startTimeAsDateObject,
  endTimeAsDateObject
) {
  // console.log("starttid:", startTimeAsDateObject);
  // console.log("sluttid:", endTimeAsDateObject);

  // räknar diff:
  const durationMilliseconds = endTimeAsDateObject - startTimeAsDateObject;
  // console.log("duration i milisekunder:", durationMilliseconds);

  const durationMinutes = durationMilliseconds / (1000 * 60);
  // console.log("duration i minuter", durationMinutes);

  const durationHours = durationMinutes / 60;
  // console.log("duration i Timmar med decimal", durationHours);

  return durationHours;
}
