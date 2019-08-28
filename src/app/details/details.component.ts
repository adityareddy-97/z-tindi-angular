import { Component, OnInit } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public restId;
  public restData;
  public reviewData;

  public lat;
  public long;

  public zoom: number = 15;

  constructor(public zomato: ZomatoService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    this.restId = this.route.snapshot.paramMap.get('restaurantId');
    console.log(this.restId);

    this.zomato.getRestaurantDetails(this.restId).subscribe(

      data => {
        this.restData = data;
        console.log(this.restData);
        this.lat = Number(this.restData.location.latitude);
        this.long = Number(this.restData.location.longitude);
        this.spinner.hide();
      }
      ,

      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.lat = null;
        this.long=null;
        this.spinner.hide();
        this.router.navigate(['**']);
      }
    );

    this.zomato.getReviews(this.restId).subscribe(

      data => {
        this.reviewData = data["user_reviews"];
        console.log(this.reviewData);

      }
      ,
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.router.navigate(['**']);
      }
    );


  }

}
