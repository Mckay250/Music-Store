import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import {  faStepForward, faRandom, faDownload, faStepBackward, faCartPlus, faInfo } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beat-store',
  templateUrl: './beat-store.component.html',
  styleUrls: ['./beat-store.component.css']
})
export class BeatStoreComponent implements OnInit {

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
  // tracks = ['../../../assets/audio/1_5010696443095154897.mp3','../../../assets/audio/1_5120797843828768775.m4a'];
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

  constructor( private trackService: TrackService,
               private cartService: CartService,
               private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadInitPost();
    // this.tracks = this.trackService.tracks;
  }

  loadInitPost() {
    this.trackService.getTracksByPage(this.currentPage)
      .subscribe(
        res => {
        this.allTracks = res;
        this.tracks = this.allTracks.results;
        this.trackSelection = this.tracks[this.trackNumber];
        },
        err => console.log(err)
      )
  }
  // loading next page from the server
  loadNextPost() {
    this.trackService.getTracksByPage(this.currentPage + 1)
      .subscribe(
        res => {
        this.newTracks = res
        this.spinner.hide();
        if (this.newTracks.results.length ===0) {
          this.notEmptyPost = false;
        }
        this.tracks = this.tracks.concat(this.newTracks.results);
        this.notScrollable = true;
        },
        err => {console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status == 404) {
              this.spinner.hide();
              this.notEmptyPost = false;
            }
          }}
      )
    this.currentPage += 1;
  }

  onScroll() {
    if (this.notScrollable && this.notEmptyPost){
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextPost();
    }
  }

  volumeChange(value) {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    track.volume = value;
    const newValue = value * 100;
    const color = 'linear-gradient(90deg, white ' + newValue + '%, black ' + newValue + '%)';
    document.getElementById('volume').style.background = color;
  }

  sliderChange(value) {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    track.currentTime = value;
    const progressColor = 'linear-gradient(90deg, red ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  slider(value) {
    const progressColor = 'linear-gradient(90deg, red ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  playPause() {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    if (this.paused === true) {
      track.play();
      this.paused = false;
      this.interval1 = setInterval(() => {
        this.changeProgressValue();
        }, 1000);
    }
    else {
      track.pause();
      this.paused = true;
      clearInterval(this.interval1);
    }
  }

  nextTrack() {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    this.trackNumber++;
    if (this.trackNumber > this.tracks.length - 1) { this.trackNumber = 0; }
    track.src = this.tracks[this.trackNumber].sample_audio;
    track.pause();
    this.paused = true;
    this.playPause();
  }

  previousTrack() {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    this.trackNumber--;
    if (this.trackNumber < 0) { this.trackNumber = this.tracks.length - 1; }
    track.src = this.tracks[this.trackNumber].sample_audio;
    track.pause();
    this.paused = true;
    this.playPause();
    this.totalValue = track.duration;
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

  changeProgressValue() {
    const progressBar: HTMLInputElement = document.querySelector('#progress-bar') as HTMLInputElement;
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    progressBar.max =  (track.duration).toString();
    const currentValue = (track.currentTime / track.duration) * 100;
    this.slider(currentValue);
    this.sliderValue = track.currentTime;
    this.totalValue = track.duration;
    if (track.currentTime === track.duration) {
      clearInterval(this.interval1);
      this.nextTrack();
    }
  }

  selectTrack(trackToBePlayed) {
    const track: HTMLMediaElement = document.getElementById('track') as HTMLAudioElement;
    // if ( !track.paused ) {
    //   track.pause()
    //   this.paused = true;
    // }
    this.trackSelection = trackToBePlayed;
    track.src = this.trackSelection.sample_audio;
    track.pause()
    this.paused = true;
    this.playPause()
    // if ( track.paused ) {
    //   this.playPause()
    // }
  }

  dropdownChange() {
    if (this.dropdown.disabled === true) {
      this.dropdown.style = 'display';
      this.dropdown.disabled = false;
    }
   else {
     this.dropdown.style = 'noDisplay';
     this.dropdown.disabled = true;
   }
  }

  addToCart(track) {
    if (track.inCart == true) {
      track.trackStatus = ''
      track.inCart = false;
      this.cartService.removeFromCart(track)
    }
    else {
      track.trackStatus = 'cart-clicked';
      track.inCart = true;
      this.cartService.addToCart(track)
    }
  }

}

