import { Component, OnInit } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public currentLocation;
  public entityId;
  public entityType;


  public _filterText: string;

  /* get() and set() functions have been used to peform a filter on the result list
  by the characters entered in the input by the user */

  get filterText(): string {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filterList = this._filterText ? this.filterOperation(this._filterText) : this.restaurantList;
  }

  public restaurantList = [];

  public filterList = [];

  filterOperation(value: string): any {
    value = value.toLowerCase();
    return this.restaurantList.filter(
      (res: any) => res.restaurant.name.toLowerCase().indexOf(value) !== -1
    );
  }

  constructor(public zomato: ZomatoService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {


    //this.entityId = this.route.snapshot.paramMap.get('locationId');
    //this.entityType = this.route.snapshot.paramMap.get('locationType');

    /* The route has been subscribed to so as to reload the component when a user selects another
     location while being in the location component view.*/

    this.route.paramMap.subscribe(
      params => {
        this.spinner.show();
        console.log(params);
        this.entityId = params.get('locationId');
        this.entityType = params.get('locationType');

        this.zomato.getLocation_Details(this.entityId, this.entityType).subscribe(

          data => {
            
            this.currentLocation = data;
            this.restaurantList = data['best_rated_restaurant'];
            this.filterList = this.restaurantList;
            this.spinner.hide();
            console.log(this.restaurantList);
          }
          ,
          error => {
            console.log("some error occured");
            console.log(error.errorMessage);

            this.spinner.hide();
            this.router.navigate(['**']);
          }

        );
      }
    );




  }

}
