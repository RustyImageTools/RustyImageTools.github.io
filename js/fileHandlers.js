export function readAsArrayBuffer(file, callback) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => callback(new Uint8Array(reader.result));
}

// Include other related functions, such as drag-and-drop handlers here.