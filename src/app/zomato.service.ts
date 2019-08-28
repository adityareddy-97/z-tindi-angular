import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';



const headers = new HttpHeaders().set("user-key", "76b921cfd73b8312cb243fe4185c65cc");

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  public baseUrl = "https://developers.zomato.com/api/v2.1/";

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    console.log("Handle http error calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }

  /* Used in searchbar for typeahead and suggestion list feature
   Fetches list of locations based on search input*/
  getLocations(location) {

    return this.http.get(this.baseUrl + "locations?query=" + location + "&count=10", { headers });

  }

  //Fetches a list of restaurants in a given location
  getLocation_Details(entityId, entityType) {

    return this.http.get(this.baseUrl + "location_details?entity_id=" + entityId + "&entity_type=" + entityType, { headers });

  }


  //Fetches the details of selected restaurants
  getRestaurantDetails(restId) {

    return this.http.get(this.baseUrl + "restaurant?res_id=" + restId, { headers }).pipe(delay(400));

  }

  //Fetches the reviews of selected restaurants
  getReviews(restId) {

    return this.http.get(this.baseUrl + "reviews?res_id=" + restId + "&count=5", { headers });

  }



}
