import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
    if (request.method === "GET") {
      const placeDetail = await Place.findById(id);
      if (!placeDetail) {
        return response.status(404).json({ status: "Not Found" });
      }
      const comments = await Comment.find({
        _id: { $in: placeDetail.comments },
      });

      return response.status(200).json({ place: placeDetail, comments });
    }

    if (request.method === "PATCH") {
      await Place.findByIdAndUpdate(id, {
        $set: request.body,
      });
      response.status(200).json({ status: `Place ${id} updated!` });
    }
    if (request.method === "DELETE") {
      const { commentId } = request.body;

      if (commentId) {
        await Comment.findByIdAndDelete(commentId);

        await Place.findByIdAndUpdate(id, {
          $pull: { comments: commentId },
        });

        return response.status(200).json({ status: "Comment deleted" });
      } else {
        await Place.findByIdAndDelete(id);
        return response
          .status(200)
          .json({ status: `Place ${id} successfully deleted.` });
      }
    }
    if (request.method === "POST") {
      const newComment = await Comment.create(request.body);

      const updatedPlaceWithComment = await Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );

      if (!updatedPlaceWithComment) {
        return response.status(404).json({ status: "Place not found" });
      }

      return response.status(200).json({
        message: "Comment added successfully.",
        place: updatedPlaceWithComment,
      });
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ status: "Internal Server Error", error: error.message });
  }
}
