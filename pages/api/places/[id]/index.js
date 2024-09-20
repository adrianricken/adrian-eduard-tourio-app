import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
// import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
    if (request.method === "GET") {
      const placeDetail = await Place.findById(id);
      console.log("placeDetail", placeDetail);

      if (!placeDetail) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(placeDetail);
    }

    // const place = Place.find((place) => place._id.$oid === id);
    // const comment = place?.comments;
    // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
    // const comments = db_comments.filter((comment) =>
    //   allCommentIds.includes(comment._id.$oid)
    // );

    //   if (!place) {
    //     return response.status(404).json({ status: "Not found" });
    //   }

    //   response.status(200).json({ place: place, comments: comments });
  } catch (e) {
    console.log(e);
  }
}
