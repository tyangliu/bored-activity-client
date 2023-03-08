export const PRICE_MAP: {[key: string]: number} = {
  Free: 0,
  Low: 0.5,
  High: 1,
};
export const PRICE_REVERSE_MAP = Object.entries(PRICE_MAP).reduce((obj, [key, val]) => {
  obj[val] = key;
  return obj;
}, {} as {[key: number]: string});
export const ACCESSIBILITY_MAP: {[key: string]: number} = {
  Low: 0,
  Medium: 0.5,
  High: 1,
};
export const ACCESSIBILITY_REVERSE_MAP = Object.entries(ACCESSIBILITY_MAP).reduce((obj, [key, val]) => {
  obj[val] = key;
  return obj;
}, {} as {[key: number]: string});

export const TYPE_ICON_MAP: {[key: string]: string} = {
  recreational: "sunny",
  cooking: "cooking",
  social: "handshake",
  relaxation: "spa",
  charity: "favorite",
  diy: "build",
  busywork: "mop",
  education: "library_books",
  music: "music_note",
}

export const TYPE_BG_MAP: {[key: string]: string} = {
  recreational: "#72c712",
  cooking: "#ff9c33",
  social: "#3ba0ff",
  relaxation: "#17cfa7",
  charity: "#ff3633",
  diy: "#7e33ff",
  busywork: "#e8fd2e",
  education: "#709bff",
  music: "#ff6940",
}
