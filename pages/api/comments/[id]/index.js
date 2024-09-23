// import dbConnect from "../../../../db/connect";
// import Place from "../../../../db/models/Place";
// import Comment from "../../../../db/models/Comment";

// export default async function handler(request, response) {
//   const { id } = request.query;

//   try {
//     await dbConnect();
//     if (req.method === "DELETE") {
//       const commentId = request.body;
//       const deletedReview = await Comment.findByIdAndDelete(commentId);
//       await Place.findByIdAndUpdate(id, {
//         $pull: { comments: deletedComment._id },
//       });
//       res.status(200).json({ status: "comment deleted" });
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }
