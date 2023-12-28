import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../video.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent {
  public files: NgxFileDropEntry[] = [];
  public isFileUploaded: boolean = false;
  public fileEntry: FileSystemFileEntry |undefined

  constructor(private videoService: VideoService, 
  private router: Router) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);

          this.isFileUploaded = true;
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  public uploadVideo() {
    if(this.fileEntry !== undefined) {
      console.log(this.fileEntry);

      this.fileEntry.file(f => {
        this.videoService.uploadVideo(f).subscribe(data=> {
          this.router.navigateByUrl("/save-video-details/" + data.videoId);
        });
      });
    }
  }
}
