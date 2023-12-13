const commentsArray = [];

function onInput() {
  let myName = document.querySelector("#name");
  let myComment = document.querySelector("#comment");

  if (myName.value.length && myComment.value.length) {
    document.querySelector("#comment_button").disabled = false;
  } else {
    document.querySelector("#comment_button").disabled = true;
  }
}

function submitComment(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const commentText = document.querySelector("#comment").value;

  if (name && commentText) {
    let nameInfo = document.createElement("div");
    nameInfo.className = "new-name-info-div";

    let userInfo = document.createElement("div");
    userInfo.className = "new-user-info-div";

    let newComment = document.createElement("div");
    newComment.className = "new-user-comment-div";

    let userImage = document.createElement("img");
    userImage.className = "new-user-img";
    userImage.src = "images/defaultprofile.png";
    userImage.alt = "User Image";

    let nameHeading = document.createElement("h3");
    nameHeading.className = "new-user-name";
    nameHeading.textContent = name;

    let usernameP = document.createElement("p");
    usernameP.className = "new-user-username";
    usernameP.textContent = "@" + name.toLowerCase().replace(/\s/g, "");

    let userCommentP = document.createElement("p");
    userCommentP.className = "new-user-comment";
    userCommentP.textContent = commentText;

    // format date using moment.js
    let dateP = document.createElement("p");
    dateP.className = "comment-date";
    dateP.textContent = moment().format("MMMM D, YYYY [at] h:mm A");

    // Construct the comment structure
    nameInfo.appendChild(nameHeading);
    nameInfo.appendChild(usernameP);
    userInfo.appendChild(userImage);
    userInfo.appendChild(nameInfo);
    newComment.appendChild(userInfo);
    newComment.appendChild(userCommentP);
    newComment.appendChild(dateP);

    // Add the new comment to the array
    commentsArray.push({
      comment: newComment.outerHTML,
      date: moment().toDate(),
    });

    // Append the new comment to the new comment container
    const commentContainer = document.querySelector(
      ".new-user-comment-container"
    );
    commentContainer.appendChild(newComment);
    newComment.scrollIntoView({ behavior: "smooth", block: "start" });

    // Clear the input fields after appending the comment to disable the button
    document.querySelector("#name").value = "";
    document.querySelector("#comment").value = "";
    document.querySelector("#comment_button").disabled = true;
  }
}

function sortComments(sortOrder) {
  commentsArray.sort((a, b) => sortOrder * (a.date - b.date));

  // Clear the comment container
  const commentContainer = document.querySelector(
    ".new-user-comment-container"
  );
  commentContainer.innerHTML = "";

  // Append sorted comments to the comment container
  commentsArray.forEach((comment) => {
    commentContainer.innerHTML += comment.comment;
  });
}
