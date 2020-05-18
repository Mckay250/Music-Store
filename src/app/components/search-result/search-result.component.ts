import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faStepForward, faRandom, faDownload, faStepBackward, faCartPlus, faInfo } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

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
  searchTerm: string;
  routeId: number;
  interval3;

  constructor(  private route: ActivatedRoute,
                private trackService: TrackService,
                private cartService: CartService,
                private spinner: NgxSpinnerService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeId = +params.get('id');
    });
    this.loadInitPost();
    this.trackService.getSelectedSearch(this.routeId)
      .subscribe(
        res => {
          this.trackSelection = res;
          this.audio.src = this.trackSelection.sample_audio;
        },
        err => {
          this.messageService.add("Sorry, can't fetch tracks at this moment")
        }
      )
  }

  loadInitPost() {
    this.trackService.getSearchTracksByPage(this.currentPage, this.trackService.previousSearchTerm)
      .subscribe(
        res => {
        this.allTracks = res;
        this.tracks = this.allTracks.results;
        },
        err => {
          this.messageService.add("Sorry, can't fetch tracks at this moment")
        }
      )
  }
  // loading next page from the server
  loadNextPost() {
    this.trackService.getSearchTracksByPage(this.currentPage + 1, this.trackService.previousSearchTerm)
      .subscribe(
        res => {
        this.newTracks = res;
        this.spinner.hide('fetching');
        if (this.newTracks.results.length ===0) {
          this.notEmptyPost = false;
        }
        this.tracks = this.tracks.concat(this.newTracks.results);
        this.notScrollable = true;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 404) {
              this.messageService.add('All tracks fetched!')
              this.spinner.hide('fetching');
              this.notEmptyPost = false;
            }
          }
          else {
            this.messageService.add("Sorry, can't fetch tracks at this moment")
          }
        }
      )
    this.currentPage += 1;
  }

  onScroll() {
    if (this.notScrollable && this.notEmptyPost){
      this.spinner.show('fetching');
      this.notScrollable = false;
      this.loadNextPost();
    }
  }

  volumeChange(value) {
    this.audio.volume = value;
    const newValue = value * 100;
    const color = 'linear-gradient(90deg, white ' + newValue + '%, black ' + newValue + '%)';
    document.getElementById('volume').style.background = color;
  }

  sliderChange(value) {
    this.audio.currentTime = value;
    const progressColor = 'linear-gradient(90deg, #23b5c8 ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  slider(value) {
    const progressColor = 'linear-gradient(90deg, #23b5c8 ' + value + '%, rgba(87, 87, 87, 0.664) ' + value + '%)';
    document.getElementById('progress-bar').style.background = progressColor;
  }

  playPause() {
    if (this.audio.paused === true) {
      this.audio.preload = 'auto';
      this.audio.play();
      this.spinner.show('playing');
      this.paused = false;
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
    if (this.trackNumber >= this.tracks.length) { this.trackNumber = 0; }
    this.trackSelection = this.tracks[this.trackNumber];
    this.audio.src = this.trackSelection.sample_audio;
    this.audio.pause();
    this.paused = true;
    this.playPause();
  }

  previousTrack() {
    this.trackNumber--;
    if (this.trackNumber < 0) { this.trackNumber = this.tracks.length - 1; }
    this.trackSelection = this.tracks[this.trackNumber];
    this.audio.src = this.trackSelection.sample_audio;
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
    this.audio.src = this.trackSelection.sample_audio;
    this.audio.pause()
    this.paused = true;
    this.playPause()
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

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
  }
}