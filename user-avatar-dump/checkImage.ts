import axios from "axios";

const imagesHost = "http://localhost:3000/images/";

export default async function checkImage(imageName: String): Promise<boolean> {
  try {
    const imageUrl = imagesHost + imageName;
    const response = await axios.get(imageUrl);
    // return true if image is healthy
    return response && response.status == 200 ? true : false;
  } catch (e) {
    return false;
  }
}
