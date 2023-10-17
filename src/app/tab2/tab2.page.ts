import { Component, OnInit } from '@angular/core';
import { Plug } from '../models/measurement/plug.model';
import { PlugsService } from '../services/plugs.service';
import { CalendarComponentOptions, CalendarModalOptions } from 'ion2-calendar';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.css']
})
export class Tab2Page implements OnInit{

  showComparison: boolean = true;

  plugs: Plug[] = [];
  firstPlugId: number;
  secondPlugId: number;
  disableButton: boolean;
  isModalOpen = false;
  dateValues: string[] = [];

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarModalOptions = {
    pickMode: 'range',
    cssClass: '',
  };

  constructor(private plugsService: PlugsService) {}

  ngOnInit(): void {
    this.loadPlugs();
    this.firstPlugId = 0;
    this.secondPlugId = 0;
    this.disableButton = true;
  }
  
  loadPlugs() {
    this.plugsService.getPlugs(4).subscribe({
      next: data => {
        this.plugs = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleChange(e: any) {
    if(this.firstPlugId != 0 && this.secondPlugId != 0){
      this.disableButton = false;
      console.log(this.disableButton);
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  addDateRange(){
    console.log('datetest', this.dateValues.length)
    if(this.dateValues.length == 3){
      this.dateValues[0] = this.dateValues[1];
      this.dateValues[1] = this.dateValues[2];
      this.dateValues[2] = '';
    }
  }
}
