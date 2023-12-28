import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { VideoDTO } from '../video-dto';

@Component({
  selector: 'app-featured-videos',
  templateUrl: './featured-videos.component.html',
  styleUrl: './featured-videos.component.css'
})
export class FeaturedVideosComponent implements OnInit{
  featuredVideos: Array<VideoDTO> = [];
  
  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe(response => {
      this.featuredVideos = response;
    });
  }
}
