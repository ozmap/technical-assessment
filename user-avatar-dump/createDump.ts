import fs from "fs";

export default function createSanitizedDump(
  userImagesMap: Map<String, Array<String>>
) {
  var dump = fs.createWriteStream("sanitized-dump.json"); // write to filename sanitized-dump.json
  userImagesMap.forEach((value, key) => {
    // for each user in map, transform data to json, then to string
    let userJson = { userId: key, images: value };
    let userString = JSON.stringify(userJson) + `\n`;
    // write string to file
    dump.write(userString);
  });
  console.log("finished creating file.");
  dump.end();
}
