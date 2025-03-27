function buildPage() {
  const root = document.createElement("div");
  root.id = "root";
  const postListContainer = document.createElement("div");
  postListContainer.id = "postListContainer";
  const actionListContainer = document.createElement("div");
  actionListContainer.id = "actionListContainer";

  const postListTitle = document.createElement("h1");
  postListTitle.textContent = "Post List";

  const postList = document.createElement("div");
  postList.id = "postList";
  postListContainer.appendChild(postListTitle);
  postListContainer.appendChild(postList);

  const fetchPostsBtnContainer = document.createElement("div");
  const fetchAllPostsContainer = document.createElement("div");
  fetchAllPostsContainer.classList.add("container");
  const fetchPostsBtn = document.createElement("button");
  fetchPostsBtn.textContent = "Fetch all posts";
  fetchPostsBtn.id = "fetchPostsBtn";
  fetchPostsBtn.classList.add("btn");
  const fetchAllTitle = document.createElement("h1");
  fetchAllTitle.textContent = "Fetch All Posts";
  fetchAllPostsContainer.appendChild(fetchAllTitle);
  fetchAllPostsContainer.appendChild(fetchPostsBtn);
  fetchPostsBtnContainer.appendChild(fetchAllPostsContainer);

  const fetchPostByIDContainer = document.createElement("div");
  const postIdInput = document.createElement("input");
  postIdInput.type = "number";
  postIdInput.id = "postIdInput";
  postIdInput.classList.add("input");
  postIdInput.placeholder = "Enter post ID";

  const fetchPostByIdBtn = document.createElement("button");
  fetchPostByIdBtn.textContent = "Get post by ID";
  fetchPostByIdBtn.id = "fetchPostByIdBtn";
  fetchPostByIdBtn.classList.add("btn");
  const fetchByIdTitle = document.createElement("h1");
  fetchByIdTitle.textContent = "Fetch Post By ID";
  fetchPostByIDContainer.appendChild(fetchByIdTitle);
  fetchPostByIDContainer.appendChild(postIdInput);
  fetchPostByIDContainer.appendChild(fetchPostByIdBtn);
  fetchPostsBtnContainer.appendChild(fetchPostByIDContainer);

  const addNewPostContainer = document.createElement("div");
  addNewPostContainer.id = "newPostContainer";
  const newPostTitle = document.createElement("input");
  const newPostBody = document.createElement("input");
  newPostTitle.type = "text";
  newPostTitle.placeholder = "Enter post title";
  newPostTitle.id = "newPostTitle";
  newPostTitle.classList.add("input");
  newPostBody.type = "text";
  newPostBody.placeholder = "Enter post body";
  newPostBody.id = "newPostBody";
  newPostBody.classList.add("input");
  const newPostBtn = document.createElement("button");
  newPostBtn.id = "newPostBtn";
  newPostBtn.classList.add("btn", "approve");
  newPostBtn.textContent = "Create new post";
  const createNewTitle = document.createElement("h1");
  createNewTitle.textContent = "Fetch Post By ID";

  addNewPostContainer.appendChild(createNewTitle);
  addNewPostContainer.appendChild(newPostTitle);
  addNewPostContainer.appendChild(newPostBody);
  addNewPostContainer.appendChild(newPostBtn);

  actionListContainer.appendChild(fetchAllPostsContainer);
  actionListContainer.appendChild(fetchPostByIDContainer);
  actionListContainer.appendChild(addNewPostContainer);

  root.innerHTML = "";
  document.body.appendChild(root);
  root.appendChild(postListContainer);
  root.appendChild(actionListContainer);
}

function createPostComponent(post) {
  showMoreIsOpen = false;

  const postComponent = document.createElement("li");
  postComponent.id = "postComponent";

  const postDiv = document.createElement("div");
  postDiv.id = "postDiv";

  const postTitle = document.createElement("h1");
  postTitle.id = "postTitle";
  postTitle.classList.add("title");
  postTitle.textContent = `${post.title}`;

  postDiv.appendChild(postTitle);

  /// ADD BUTTONS

  const btnDiv = document.createElement("div");

  const postBody = document.createElement("p");

  postTitle.addEventListener("click", function () {
    if (this.showMoreIsOpen) {
      this.showMoreIsOpen = false;
      postBody.textContent = ``;
    } else {
      this.showMoreIsOpen = true;
      postBody.textContent = `${post.body}`;
    }
  });

  const editPostBtn = document.createElement("button");
  editPostBtn.id = "editPostBtn";
  editPostBtn.classList.add("btn", "small");
  editPostBtn.textContent = "Edit";
  editPostBtn.addEventListener("click", function () {
    postDiv.removeChild(postTitle);
    postDiv.removeChild(btnDiv);
    postDiv.removeChild(postBody);
    const postTitleInput = document.createElement("input");
    postTitleInput.type = "text";
    postTitleInput.id = "postTitleInput";
    postTitleInput.classList.add("input", "edit");
    postTitleInput.value = post.title;
    postDiv.appendChild(postTitleInput);
    const postBodyInput = document.createElement("textarea");
    postBodyInput.id = "postBodyInput";
    postBodyInput.classList.add("input", "edit", "body");
    postBodyInput.value = post.body;
    postBodyInput.wrap = "soft";
    postDiv.appendChild(postBodyInput);
    const saveEditBtn = document.createElement("button");
    saveEditBtn.textContent = "Save";
    saveEditBtn.id = "saveEditBtn";
    saveEditBtn.classList.add("btn", "approve");
    saveEditBtn.addEventListener("click", function () {
      editPost(post.id);
      //CLOSE EDIT MENU
      postDiv.removeChild(postTitleInput);
      postDiv.removeChild(postBodyInput);
      postDiv.removeChild(saveEditBtn);
      postDiv.removeChild(cancelEditBtn);
      postDiv.appendChild(postTitle);
      postDiv.appendChild(postBody);
      postDiv.appendChild(btnDiv);
    });
    postDiv.appendChild(saveEditBtn);
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.textContent = "Cancel";
    cancelEditBtn.id = "cancelEditBtn";
    cancelEditBtn.classList.add("btn", "danger");
    cancelEditBtn.addEventListener("click", function () {
      postDiv.removeChild(postTitleInput);
      postDiv.removeChild(postBodyInput);
      postDiv.removeChild(saveEditBtn);
      postDiv.removeChild(cancelEditBtn);
      postDiv.appendChild(postTitle);
      postDiv.appendChild(postBody);
      postDiv.appendChild(btnDiv);
    });
    postDiv.appendChild(cancelEditBtn);
  });

  const deletePostBtn = document.createElement("button");
  deletePostBtn.classList.add("btn", "danger", "small");
  deletePostBtn.id = "deletePostBtn";
  deletePostBtn.textContent = "Delete";
  deletePostBtn.addEventListener("click", function () {
    deletePost(post.id);
  });

  btnDiv.appendChild(editPostBtn);
  btnDiv.appendChild(deletePostBtn);
  postDiv.appendChild(postBody);
  postDiv.appendChild(btnDiv);
  postComponent.appendChild(postDiv);
  return postComponent;
}

function showEditPanel() {}

window.onload = buildPage();
