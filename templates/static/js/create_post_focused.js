function main() {
    createPost();
}

function createPost() {

    // ELEMENTS

    let topicsDiv = document.querySelector(".topics-list");
    let profilePic = document.querySelector(".profile-picture");
    let posterUsername = document.querySelector(".username");
    let postTitle = document.querySelector(".title");
    let postDescription = document.querySelector(".description");
    let commentsContainer = document.querySelector(".comments-list");

    if (!topicsDiv) {
        console.error("topics-list element not found!");
        return;
    }

    let numTopics = 5;
    let numComments = 5;

    // TOPICS 

    for (let i = 1; i <= numTopics; i++) {
        const topicContainer = document.createElement('li');
        topicContainer.classList.add('topic');

        const topicText = document.createElement('h1');
        topicText.textContent = "Topic " + i;

        topicContainer.appendChild(topicText);
        topicsDiv.appendChild(topicContainer);
    }

    // USER INFO

    profilePic.src = "data:image/jpeg;base64,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";
    posterUsername.textContent = "Username";
    postTitle.textContent = "Post title";
    postDescription.textContent = "This is a test post description";


    // COMMENTS

    for (let i = 1; i <= numComments; i++) {
        const comment = document.createElement('li');
        comment.classList.add('comment');

        const commentUserContainer = document.createElement('div');
        commentUserContainer.classList.add('comment-user-container');

        const commentPfpContainer = document.createElement('div');
        commentPfpContainer.classList.add('comment-profile-picture-container');

        const commentPfp = document.createElement('img');
        commentPfp.src = "data:image/jpeg;base64,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";

        const commentUsername = document.createElement('h1');
        commentUsername.classList.add('comment-username');
        commentUsername.textContent = "Commenter " + i;
        
        commentPfpContainer.appendChild(commentPfp);
        commentUserContainer.appendChild(commentPfpContainer);
        commentUserContainer.appendChild(commentUsername);

        const commentTextContainer = document.createElement('div');
        commentTextContainer.classList.add('comment-text-container');

        const commentText = document.createElement('h1');
        commentText.classList.add('comment-text');
        commentText.textContent = "This is test comment #" + i;
        
        commentTextContainer.appendChild(commentText);  
        
        comment.appendChild(commentUserContainer);
        comment.appendChild(commentTextContainer);
        commentsContainer.appendChild(comment);
    }
}

document.addEventListener("DOMContentLoaded", main);