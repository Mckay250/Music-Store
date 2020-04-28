import { Component, OnInit } from '@angular/core';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube, } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  icons = {
    facebook : faFacebook,
    twitter : faTwitter,
    instagram : faInstagram,
    youtube : faYoutube,
    send : faEnvelope
  }
  constructor() { }

  ngOnInit(): void {
  }

}
