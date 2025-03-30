// UPPDATERAR EN TIMESTRING MED NYTT KLOCKSLAG TIMMAR OCH MINUTER:
// tar in en Timestring som ett dateObjekt och en ny önskad tid som en sträng i formatet "HH:MM"
export function getUpdatedTime(oldTimeStringAsDateObject, newTime) {
  // datan ska komma in som utc-tid!
  // console.log(
  //   "!!! - Tider som visas i uit är råa direkt från databasen. dvs global UTC tid. inte lokal tid."
  // );

  // console.log("DEN NYA TIDEN att uppdatera den gamla tiden med: ", newTime);

  const oldDateObject = new Date(oldTimeStringAsDateObject); // här blir det lokal tid
  // console.log("OLD TIME - men lokal tid : ", oldDateObject);

  // Splitta den nya tiden till timmar och minuter
  const [newHours, newMinutes] = newTime.split(":").map(Number);

  // Sätt den nya tiden i UTC (den kommer inte att påverkas av lokal tid)
  oldDateObject.setUTCHours(newHours, newMinutes, 0, 0); // Sätt ny tid i UTC

  // console.log("UPPDATERAT - men still lokal tid: ", oldDateObject); //fortfarande lokal tid

  const newTimeString = oldDateObject.toISOString(); // Konvertera tillbaka till ISO-sträng i UTC
  // console.log("NYA TIDEN I GLOBALT FORMAT:", newTimeString); // Ny starttid i ISO-format (UTC)

  return newTimeString;
}