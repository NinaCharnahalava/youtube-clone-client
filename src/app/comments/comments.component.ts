import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { CommentService } from '../comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDTO } from '../comment-dto';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input()
  videoId: string = '';
  commentsForm: FormGroup;
  commentsDTO: CommentDTO[] = [];
  commentDTO!: CommentDTO;
  
  constructor(private userService: UserService,
    private commentService: CommentService,
    private matSnackBar: MatSnackBar) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  public postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    
    const commentDTO = {
      "commentText": comment,
      "authorId": this.userService.getUserId()
    }

    this.commentService.postComment(commentDTO, this.videoId).subscribe(() => {
      this.matSnackBar.open("Comment Posted Successfully!", "OK");

      this.commentsForm.get('comment')?.reset();

      this.getComments();
    });
  }

  public getComments() {
    this.commentService.getAllComments(this.videoId).subscribe(data => {
      this.commentsDTO = data;
    });
  }
}
