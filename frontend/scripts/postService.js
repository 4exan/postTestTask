let storedPosts = [];
let storedPost = {};

function fetchPosts() {
  fetch("http://localhost:3000/api/posts") //REQUEST TO BACKEND
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched posts:", data);
      storedPosts = data;
      displayPosts(storedPosts);
    })
    .catch((error) => {
      console.log("Error fetching posts:", error);
    });
}

function fetchPostById() {
  const postid = document.getElementById("postIdInput");
  console.log(postid.value);
  if (postid.value == "") {
    alert("You must enter post ID");
  } else {
    fetch(`http://localhost:3000/api/post/${postid.value}`) //REQUEST TO BACKEND
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        storedPost = data;
        displaySinglePost(storedPost);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
      });
  }
}

function createNewPost() {
  const newPost = {
    title: `${document.getElementById("newPostTitle").value}`,
    body: `${document.getElementById("newPostBody").value}`,
    userId: 1,
  };
  if (newPost.title == "" || newPost.body == "") {
    alert("Post must contain Title and Body");
  } else {
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        storedPosts.unshift(newPost);
        displayPosts(storedPosts);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error creating new post:", error);
      });
  }
}

function editPost(postId) {
  const post = storedPosts.find((p) => p.id === postId);
  const newTitle = document.getElementById("postTitleInput").value;
  const newBody = document.getElementById("postBodyInput").value;
  post.title = newTitle;
  post.body = newBody;
  displayPosts(storedPosts);

  const data = {
    title: `${newTitle}`,
    body: `${newBody}`,
  };
  if (data.title == "" || data.body == "") {
    alert("Post must contain Title and Body");
  } else {
    fetch(`http://localhost:3000/api/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error while edit post with ID ${postId}:`, error);
      });
  }
}

function deletePost(postId) {
  fetch(`http://localhost:3000/api/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(`Error while deleting post with ID ${postId}:`, error);
    });
  let updatedArray = storedPosts.filter((post) => post.id !== postId);
  storedPosts = updatedArray;
  displayPosts(storedPosts);
}
