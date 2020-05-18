import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import {  faStepForward, faRandom, faDownload, faStepBackward, faCartPlus, faInfo } from '@fortawesome/free-solid-svg-icons'
import { MessageService } from 'src/app/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchasedItemsService } from 'src/app/services/purchased-items.service';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {

  icons = {
    pause : faPauseCircle,
    play : faPlayCircle,
    previous : faStepBackward,
    next : faStepForward,
    shuffle : faRandom,
    addToCart : faCartPlus,
    info : faInfo,
    download: faDownload
  }
  dropdown = {
    disabled : true,
    style : 'noDisplay'
  }
  paused = true;
  interval1;
  shuffle = {
    state: false,
    display: 'text-danger'
  };
  audio = new Audio();
  tracks;
  trackSelection;
  trackNumber = 0;
  sliderValue = 0;
  totalValue = 0;
  allTracks;
  newTracks;
  currentPage: number = 1;
  notEmptyPost = true;
  notScrollable = true;
  interval3;

  constructor( private messageService: MessageService,
               private purchaseService: PurchasedItemsService,
               private spinner: NgxSpinnerService, ) { }

  ngOnInit(): void {
    this.tracks = this.purchaseService.purchased;
    this.trackSelection = this.tracks[0];
  }

  volumeChange(value) {
    this.audio.volume = value;
    const newValue = value * 100;
    const color = 'linear-gradient(90deg, white ' + newValue + '%, black ' + newValue + '%)';
    document.getElementById('volume').style.background = color;
  }

  sliderChange(value) {
    this.audio.currentTime = value;
    const progressColor = 'linear-gradient(90deg, rgb(17, 17, 17) ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  slider(value) {
    const progressColor = 'linear-gradient(90deg, rgb(17, 17, 17) ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  playPause() {

    if (this.audio.paused === true) {
      this.audio.preload = 'auto';
      this.audio.play();
      this.spinner.show('playing');
      this.interval3 = setInterval(() => {
        this.changePlayState();
      }, 500);
      this.interval1 = setInterval(() => {
        this.changeProgressValue();
        }, 1000);
    }
    else {
      this.audio.pause();
      this.paused = true;
      clearInterval(this.interval1);
    }
  }

  nextTrack() {
    this.trackNumber++;
    if (this.trackNumber > this.tracks.length - 1) { this.trackNumber = 0; }
    this.trackSelection = this.tracks[this.trackNumber];
    this.audio.src = this.trackSelection.mp3;
    this.audio.pause();
    this.paused = true;
    this.playPause();
  }

  previousTrack() {
    this.trackNumber--;
    if (this.trackNumber < 0) { this.trackNumber = this.tracks.length - 1; }
    this.trackSelection = this.tracks[this.trackNumber];
    this.audio.src = this.trackSelection.mp3;
    this.audio.pause();
    this.paused = true;
    this.playPause();
  }

  shuffleSong() {
    if (this.shuffle.state === false) {
      this.shuffle.display = 'text-dark';
      this.shuffle.state = true;
    }
    else {
      this.shuffle.display = 'text-danger';
      this.shuffle.state = false;
    }
  }
  changePlayState() {
    if (this.audio.duration > 0) {
      this.paused = false;
      this.spinner.hide('playing');
      clearInterval(this.interval3);
    }
  }

  changeProgressValue() {
    const progressBar: HTMLInputElement = document.querySelector('#progress-bar') as HTMLInputElement;
    progressBar.max =  (this.audio.duration).toString();
    const currentValue = (this.audio.currentTime / this.audio.duration) * 100;
    this.slider(currentValue);
    this.sliderValue = this.audio.currentTime;
    this.totalValue = this.audio.duration;
    if (this.audio.currentTime === this.audio.duration) {
      clearInterval(this.interval1);
      this.nextTrack();
    }
  }

  selectTrack(trackToBePlayed) {
    this.trackSelection = trackToBePlayed;
    this.audio.src = this.trackSelection.mp3;
    this.audio.pause()
    this.paused = true;
    this.playPause()
  }

  downloadWav() {
    this.messageService.add('Downloading wav file!')
  }

  downloadMp3() {
    this.messageService.add('Downloading mp3 file!')
  }
  // dropdownChange() {
  //   if (this.dropdown.disabled === true) {
  //     this.dropdown.style = 'display';
  //     this.dropdown.disabled = false;
  //   }
  //  else {
  //    this.dropdown.style = 'noDisplay';
  //    this.dropdown.disabled = true;
  //  }
  // }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
  }

}