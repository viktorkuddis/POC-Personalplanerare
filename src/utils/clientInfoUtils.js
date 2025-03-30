export function getClientRemInPixels() {
  const remInPixels = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  // console.log("Pixlar motsvarande aktuell rem: ", remInPixels);

  return remInPixels;
}
