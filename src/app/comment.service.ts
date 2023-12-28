import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from './comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}
  
  public postComment(CommentDTO: any, videoId: string): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/videos/" + videoId + "/comment", CommentDTO);
  }

  public getAllComments(videoId: string): Observable<Array<CommentDTO>> {
    return this.httpClient.get<CommentDTO[]>("http://localhost:8080/api/videos/" + videoId + "/comments");
  }
} 
