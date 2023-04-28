import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-plug-comparism',
  templateUrl: './plug-comparism.page.html',
  styleUrls: ['./plug-comparism.page.css'],
})
export class PlugComparismPage implements OnInit {

  firstPlugId: number  = 0;
  secondPlugId: number  = 0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.firstPlugId = Number(params['firstId']);
        this.secondPlugId = Number(params['secondId']);
        console.log(this.firstPlugId)
        console.log(this.secondPlugId)
      }
    )
  }

}
