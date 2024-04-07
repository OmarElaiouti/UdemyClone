import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../Models/lesson';
import { FormsModule } from '@angular/forms';
import { VideoLessonService } from '../../Services/videoLesson/video-lesson.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent  implements OnInit {
  @Input() courseId!: number;

  comments: IComment[] = [];
  newComment: string = '';
  personName: string = ''; 
  personPictureUrl: string = ''; 

  constructor(private commentService: VideoLessonService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.commentService.GetComments(this.courseId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      const newComment: IComment = {
        id: 0 , 
        courseId: this.courseId, 
        content: this.newComment.trim(),
        studentName: "",
        studentImage: "",
        answerTo: 0, // Make answer optional
        isReply: false,
        isUserComment: true,
        isUpdated: true,
        date: ""
        };

   


      this.commentService.SetStudentComment(this.courseId,newComment).subscribe(() => {
        this.fetchComments();
        this.newComment = '';
      });
    }
  }

  // deleteComment(index: number) {
  //   const commentId = this.comments[index].id;
  //   this.commentService.deleteComment(this.courseId, commentId).subscribe(() => {
  //     this.fetchComments();
  //   });
  // }

}
