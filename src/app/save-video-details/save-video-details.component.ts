import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDTO } from '../video-dto';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})
export class SaveVideoDetailsComponent {
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  selectable = true;
  removable = true
  editable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  browsedFile!: File;
  browsedFileName = '';
  videoId = '';
  isFileBrowsed = false;
  videoUrl!: string;
  thumbnailUrl!: string;
  isVideoAvailable: boolean = false;
  announcer = inject(LiveAnnouncer);
  
  constructor(private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
      this.isVideoAvailable = true;
    });
    
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    });
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value) {
      this.tags.push(value);
    }
    
    event.chipInput!.clear();
  }

  public remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${value}`);
    }
  }

  public edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    
    if (index >= 0) {
      this.tags[index]= value;
    }
  }

  public onFileBrowse(event: Event ) {
    //@ts-ignore
    this.browsedFile = event.target.files[0];
    this.browsedFileName = this.browsedFile.name;
    this.isFileBrowsed = true;
  }

  public onUploadThumbnail() {
    this.videoService.uploadThumbnail(this.browsedFile, this.videoId).subscribe(data =>{
      console.log(data);
      
      this.matSnackBar.open("The thumbnail uploaded successfully!", "OK");
    });
  }

  public saveVideoMetadata() {
    const videoMetadata: VideoDTO = {
      "id": this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description": this.saveVideoDetailsForm.get('description')?.value,
      "tags": this.tags,
      "videoUrl": this.videoUrl,
      "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value,
      "thumbnailUrl": this.thumbnailUrl,
      "likesCount": 0,
      "dislikesCount": 0,
      "viewCount": 0
    }

    this.videoService.saveVideo(videoMetadata).subscribe(data => {
      this.matSnackBar.open("Video Metadata was saved successfully!", "OK");
    });
  }
}
