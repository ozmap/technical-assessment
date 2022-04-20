import lineReader from "line-reader";
import checkImage from "./checkImage";
import createSanitizedDump from "./createDump";

export default function filterDump(dumpFile: String) {
  const userImagesMap = new Map();
  console.log("started filtering.");
  lineReader.eachLine(
    dumpFile,
    (line) => {
      try {
        var lineJson = JSON.parse(line);
        if (userImagesMap.has(lineJson.userId)) {
          // if user is already in map, return images associated
          let userImages = userImagesMap.get(lineJson.userId);
          if (
            // if user has less than 3 images associated and image is healthy
            userImages.length < 3 &&
            checkImage(lineJson.image.split("/").slice(-1)[0])
          ) {
            // add image to user ('s images array)
            userImages.push(lineJson.image);
          }
        } else {
          if (lineJson.userId) {
            // else initialize user images array in map
            userImagesMap.set(lineJson.userId, []);
            userImagesMap.get(lineJson).push(lineJson.image);
          }
        }
      } catch (e) {}
    },
    function (err) {
      if (err) {
        throw err;
      }
      console.log("done filtering.");
      console.log("creating file.");
      createSanitizedDump(userImagesMap);
    }
  );
}
