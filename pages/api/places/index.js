import Place from "../../../db/models/Place";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const places = await Place.find();
      return response.status(200).json(places);
    }
  } catch (error) {
    console.log(error);
  }
}
