import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from "../video";

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})


export class VideoCenterComponent implements OnInit {

  selectedVideo: Video;

  private hidenewVideo: boolean = true;

  videos: Array<Video>;

  //dependency injection, instance
  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => this.videos = resVideoData);//resign them to this.videos array
  }

  onSelectVideo(video: any) {
   // this.hidenewVideo = true; //any time return to show the selected video, even in the middle of create a new video
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

  newVideo() {
    this.hidenewVideo = false;
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hidenewVideo = true;
        this.selectedVideo = resNewVideo;
      });

  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for (let i = 0; i < videoArray.length; i++) {
          if (videoArray[i]._id === video._id) {
            videoArray.splice(i, 1);
          }
        }
      });
    this.selectedVideo = null;
  };

  //give up the new video
  cancelNewVideo() {
    this.hidenewVideo = true;
    this.selectedVideo = null;
  }
}
