import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDTO } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  public uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData(); 
    formData.append('file', fileEntry, fileEntry.name); 

    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }

  public uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name); 
    formData.append('videoId', videoId);

    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData, {
      responseType: 'text'
    });
  }

  public getVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.get<VideoDTO>("http://localhost:8080/api/videos/" + videoId);
  }

  public saveVideo(videoMetadata: VideoDTO): Observable<VideoDTO> {
    return this.httpClient.put<VideoDTO>("http://localhost:8080/api/videos", videoMetadata);
  }

  public getAllVideos(): Observable<Array<VideoDTO>> {
    return this.httpClient.get<Array<VideoDTO>>("http://localhost:8080/api/videos");
  }

  public likeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>("http://localhost:8080/api/videos/" + videoId + "/like", null);
  }

  public dislikeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>("http://localhost:8080/api/videos/" + videoId + "/dislike", null);
  }
}
