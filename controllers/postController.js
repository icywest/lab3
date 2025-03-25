import Post from "../models/Post.js";

export async function getPosts(req, res) {
  try {
    const {userId} = req.params;
    const posts = await Post.findAll({ where: { userId } });
    res.status(200).json({
      posts
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving posts.");
  }
}

export async function addPosts(req, res) {
  try{
    const { userId } = req.params;
    console.log("User: " + userId);
    const { title, content } = req.body;

    console.log("Title: " + title);
    console.log("Content: " + content);
    console.log("UserId: " + userId);

    const post = new Post(
      {
        title: title,
        content: content,
        userId: userId
      }
    )
    await post.save();
    res.redirect(`/profile/${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding a post.");
  }
}

export async function deletePost(req, res) {
  try {
    const { userId, postId } = req.params;

    //await Post.destroy({ where: { id: postIdParsed } });
    await Post.destroy({where: {id: postId}})

    res.redirect(`/profile/${userId}`);
  }
  catch(e) {
    console.error(e);
    res.status(500).send("An error occurred while deleting a post.");
  }
}

export async function updatePost(req, res) {
  try {
    const { userId, postId } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(postId);

    await post.update({
      title: title,
      content: content,
      userId: userId
    })

    res.redirect(`/profile/${userId}`);
  }
  catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating a post.");
  }
}
