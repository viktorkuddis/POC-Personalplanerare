export function calculateDurationInHours(
  startTimeAsDateObject,
  endTimeAsDateObject
) {
  // console.log("starttid:", startTimeAsDateObject);
  // console.log("sluttid:", endTimeAsDateObject);



  // räknar diff:
  //(ser till att de verkligen är dateobjekt också )
  const durationMilliseconds = new Date(endTimeAsDateObject) - new Date(startTimeAsDateObject);
  // console.log("duration i milisekunder:", durationMilliseconds);

  const durationMinutes = durationMilliseconds / (1000 * 60);
  // console.log("duration i minuter", durationMinutes);

  const durationHours = durationMinutes / 60;
  // console.log("duration i Timmar med decimal", durationHours);

  return durationHours;
}

export function calculateStartTimeDurationInHours(
  startTimeAsDateObject
) {

  const shiftStartTime = new Date(startTimeAsDateObject)

  console.log(typeof startTimeAsDateObject)


  let nolltid = new Date(startTimeAsDateObject);
  nolltid.setUTCHours(0, 0, 0, 0);
  // console.log(nolltid);

  // räknar diff:
  const durationMilliseconds = shiftStartTime - nolltid;
  // console.log("duration i milisekunder:", durationMilliseconds);

  const durationMinutes = durationMilliseconds / (1000 * 60);
  // console.log("duration i minuter", durationMinutes);

  const durationHours = durationMinutes / 60;
  // console.log("duration i Timmar med decimal", durationHours);

  return durationHours;
}


