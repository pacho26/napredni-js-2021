import { Component } from "@angular/core";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.component.html",
  styleUrls: ["./forum.component.css"],
})
export class ForumComponent {
  posts = [
    {
      author: "Ognjen Staničić",
      timestamp: new Date("2021-11-19 17:38:24"),
      comment: "Nemam komenatara...",
      isEditing: false,
    },
    {
      author: "Patrik Slovic",
      timestamp: new Date("2021-11-18 23:46:05"),
      comment: "Ovo je moj komentar.",
      idEditing: false,
    },
  ];
  newPost = {
    author: "",
    timestamp: null,
    comment: "",
    isEditing: false,
  };
  isWritingNewPost = false;

  addPost() {
    this.newPost.timestamp = new Date();
    this.posts.unshift(this.newPost);
    this.isWritingNewPost = false;
    this.clearNewPostFields();
  }

  clearNewPostFields() {
    this.newPost = {
      author: "",
      timestamp: null,
      comment: "",
      isEditing: false,
    };
  }

  checkInputs() {
    const authorLength = this.newPost.author.trim().length;
    const commentLength = this.newPost.comment.trim().length;

    return authorLength && commentLength ? true : false;
  }
}
