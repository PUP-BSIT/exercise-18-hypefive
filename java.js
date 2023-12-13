let commenterName = document.getElementById("commenter_name");
let commenterText = document.getElementById("comment_text");
let commentButton = document.getElementById("comment_button");
let commentList = document.getElementById("data_list");

let commentsArray = [];

commenterName.addEventListener("input", validateForm);
commenterText.addEventListener("input", validateForm);
commentButton.addEventListener("click", addComment);

function validateForm() {
  let nameValue = commenterName.value.trim();
  let commentValue = commenterText.value.trim();

  if (nameValue && commentValue) {
    commentButton.disabled = false;
  } else {
    commentButton.disabled = true;
  }
}

function addComment() {
  let addName = commenterName.value.trim();
  let addCommentText = commenterText.value.trim();

  if (addName && addCommentText) {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();

    let commentItem = {
      name: addName,
      comment: addCommentText,
      date: formattedDate,
    };

    commentsArray.push(commentItem);

    commentsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    displayComments();

    commenterName.value = "";
    commenterText.value = "";
    commentButton.disabled = true;
  }
}

function displayComments() {
  commentList.innerHTML = "";

  commentsArray.forEach((comment) => {
    let commentItem = document.createElement("p");
    commentItem.textContent = 
    `${comment.name} - ${comment.comment} - (${comment.date})`;
    commentList.appendChild(commentItem);
  });
}

function sortCommentsAscending() {
  commentsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
  displayComments();
}

function sortCommentsDescending() {
  commentsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  displayComments();
}
