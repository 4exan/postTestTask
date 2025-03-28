const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

let postList = [];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, "");
    const pathParts = trimedPath.split("/");
    const postId = pathParts[2];
    // ========== POST REQUEST ===================
    if (path === "/api/posts" && req.method === "POST") {
      try {
        const newPostRaw = JSON.parse(buffer);
        let newPost = {
          title: newPostRaw.title,
          body: newPostRaw.body,
          userId: newPostRaw.userId,
          id: postList.length + 1,
        };
        postList.unshift(newPost);
        console.log("Received new post:", newPost);
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Created new post:", data);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 201;
            res.end(
              JSON.stringify({
                message: "Successfully created new post",
                post: newPost,
              })
            );
          })
          .catch((error) => {
            console.error("Error creating new post:", error);
          });
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
      // ============= GET REQUEST =====================
    } else if (path === "/api/posts" && req.method === "GET") {
      if (postList.length > 0) {
        res.statusCode = 200;
        res.end(JSON.stringify(postList));
      } else {
        try {
          fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => {
              console.log("Fetching all posts");
              postList = data;
              res.statusCode = 200;
              res.end(JSON.stringify(postList));
            })
            .catch((error) => {
              console.log("Error fetching posts:", error);
            });
        } catch (error) {
          res.statusCode === 500;
          res.end(JSON.stringify({ message: "Internal Error" }));
        }
      }
      // ============ GET REQUEST =========================
    } else if (
      trimedPath.startsWith("api/post") &&
      postId &&
      req.method === "GET"
    ) {
      const postIdInt = parseInt(postId);
      if (postList.length > 0) {
        const postItem = postList.find((post) => post.id === postIdInt);
        if (postItem) {
          console.log("Sending post:", postItem);
          res.statusCode = 200;
          res.end(JSON.stringify(postItem));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: "No post with that ID" }));
        }
      } else {
        try {
          fetch(`https://jsonplaceholder.typicode.com/posts/${postIdInt}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(`Fetching post with id ${postIdInt}`);
              res.statusCode = 200;
              res.end(JSON.stringify(postItem));
            })
            .catch((error) => {
              console.log(`Error fetching post with id ${postIdInt}:`, error);
            });
        } catch (error) {
          res.statusCode = 404;
        }
      }
      // ============ PUT REQUEST ================
    } else if (
      trimedPath.startsWith("api/post") &&
      postId &&
      req.method === "PUT"
    ) {
      const postIdInt = parseInt(postId);
      if (postList.length > 0) {
        const editedPost = JSON.parse(buffer);
        const postItemIndex = postList.findIndex(
          (post) => post.id === postIdInt
        );
        postList[postItemIndex].title = editedPost.title;
        postList[postItemIndex].body = editedPost.body;
      }
      try {
        const editPost = JSON.parse(buffer);
        console.log("Edited post:", editPost);
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editPost),
        })
          .then((response) => response.json())
          .then(() => {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                message: "Successfully edited post",
                post: editPost,
              })
            );
          })
          .catch((error) => {
            console.error("Error editing post:", error);
          });
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
      // ============ DELETE REQUEST ============
    } else if (
      trimedPath.startsWith("api/post") &&
      postId &&
      req.method === "DELETE"
    ) {
      if (postList.length > 0) {
        const postIdInt = parseInt(postId);
        const updatedArray = postList.filter((post) => post.id !== postIdInt);
        postList = updatedArray;
      }
      try {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(`Successfully deleted post with ID: ${postId}`);
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                message: `Successfully deletet post with ID: ${postId}`,
              })
            );
          })
          .catch((error) => {
            console.error(
              `Error while deleting post with ID ${postId}:`,
              error
            );
          });
      } catch (error) {}
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
