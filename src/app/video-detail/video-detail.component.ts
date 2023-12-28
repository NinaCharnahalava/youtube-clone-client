import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
  videoId!: string;
  videoUrl!: string;
  isVideoAvailable: boolean = false;
  videoTitle!: string;
  videoDescription!: string;
  videoTags: Array<string> = [];
  likesCount: number = 0;
  dislikesCount: number = 0;
  viewCount: number = 0;
  showSubscribedButton: boolean = true;
  showUnsubscribedButton: boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute, 
    private videoService: VideoService,
    private userService: UserService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.isVideoAvailable = true;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.videoTags = data.tags;
      this.likesCount = data.likesCount;
      this.dislikesCount = data.dislikesCount;
      this.viewCount = data.viewCount;
    });
  }

  public likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.likesCount = data.likesCount;
      this.dislikesCount = data.dislikesCount;
    });
  }

  public dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(data => {
      this.dislikesCount = data.dislikesCount;
      this.likesCount = data.likesCount;
    });
  }

  public subscribeToUser() {
    let userId = this.userService.getUserId();
    
    this.userService.subscribeToUser(userId).subscribe(data => {
      this.showUnsubscribedButton = true;
      this.showSubscribedButton = false;
    });
  }

  public unsubscribeToUser() {
    let userId = this.userService.getUserId();
    
    this.userService.unsubscribeToUser(userId).subscribe(data => {
      this.showSubscribedButton = true;
      this.showUnsubscribedButton = false;
    });
  }
}
