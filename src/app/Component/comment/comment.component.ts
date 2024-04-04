import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../Services/comment/comment.service';
import { IComment } from '../../Models/lesson';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent  implements OnInit {
  @Input() courseId!: Number;

  comments: IComment[] = [];
  newComment: string = '';
  personName: string = ''; 
  personPictureUrl: string = ''; 

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.commentService.getComments(this.courseId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      const newComment: IComment = {
        id: 0 , 
        courseId: this.courseId, 
        content: this.newComment.trim(),
        personName: this.personName,
        personPictureUrl: this.personPictureUrl
      };

      this.commentService.addComment(newComment).subscribe(() => {
        this.fetchComments();
        this.newComment = '';
      });
    }
  }

  deleteComment(index: number) {
    const commentId = this.comments[index].id;
    this.commentService.deleteComment(this.courseId, commentId).subscribe(() => {
      this.fetchComments();
    });
  }

}
