function checkSpam(str) {
  let spamMarkers = ['1xbet', 'xxx'];
  let banHammer = false;
  
  for (let i = 0; i < spamMarkers.length; i++) {
    if (str.toLowerCase().indexOf( spamMarkers[i] ) >= 0) {
      banHammer = true;
    }
  }
  return banHammer;
}
