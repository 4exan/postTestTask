const fetchAllPostsBtn = document.getElementById("fetchPostsBtn");
fetchAllPostsBtn.addEventListener("click", function () {
  clearPostList();
  fetchPosts();
});

const fetchPostByIdBtn = document.getElementById("fetchPostByIdBtn");
fetchPostByIdBtn.addEventListener("click", function () {
  clearPostList();
  singlePost = fetchPostById();
});

const newPostBtn = document.getElementById("newPostBtn");
newPostBtn.textContent = "Creeate new post";
newPostBtn.addEventListener("click", function () {
  createNewPost();
});

function displayPosts(posts) {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";
  posts.forEach((p) => {
    const postItem = createPostComponent(p);
    postList.appendChild(postItem);
  });
}

function displaySinglePost(post) {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";
  if (!post?.title || !post?.body) {
    const postItem = createErrorComponent("No such post with that ID");
    postList.appendChild(postItem);
  } else {
    const postItem = createPostComponent(post);
    postList.appendChild(postItem);
  }
}

function createPostButtonsComponent(post) {
  const btnDiv = document.createElement("div");
  btnDiv.id = "btnDiv_id";

  const showMoreBtn = createButton("showMoreBtn_id", "Show more");

  showMoreBtn.addEventListener("click", function () {
    if (this.showMoreIsOpen) {
      this.showMoreIsOpen = false;
      showMoreBtn.textContent = `Show more`;
      postComponent.removeChild(postBody);
    } else {
      this.showMoreIsOpen = true;
      showMoreBtn.textContent = `Hide`;
      postComponent.appendChild(postBody);
    }
  });

  btnDiv.appendChild(showMoreBtn);

  const editPostBtn = createButton("editPostBtn_id", "Edit");

  editPostBtn.addEventListener("click", function () {
    alert(`Edited post with id: ${post.id}`);
  });

  btnDiv.appendChild(editPostBtn);

  const deletePostBtn = createButton("deletePostBtn_id", "Delete");

  deletePostBtn.addEventListener("click", function () {
    alert(`Deleted post with id: ${post.id}`);
  });

  btnDiv.appendChild(deletePostBtn);

  return btnDiv;
}

function clearPostList() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";
}
