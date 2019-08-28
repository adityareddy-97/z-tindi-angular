import { Component, OnInit } from '@angular/core';
import { ZomatoService } from '../zomato.service';

import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  results;
  displayList = false;
  locations = [];

  excludeBeforeClick = false;


  queryField: FormControl = new FormControl();

  constructor(private zomato: ZomatoService) { }

  ngOnInit() {

    this.queryField.valueChanges.pipe(
      filter(query => !query || query.length > 2 || query !== ''),
      debounceTime(800),
      distinctUntilChanged(),
      filter(query => query !== ''),
      switchMap(query => query.length > 2

        ? this.zomato.getLocations(query)
        : this.locations = []

      )
    ).subscribe(

      response => {
        this.displayList = true;
        this.results = response;
        // console.log(this.results.location_suggestions);
        this.locations = this.results.location_suggestions;
      }

    );

  }




  OnFocus(value) {
    console.log('focus ');

    if (value.length > 1) {
      this.displayList = true;
    }
    else {
      this.displayList = false;
    }
  }

  OnClickOutside(e: Event) {
    console.log(e.type);
    this.displayList = false;
  }

  OnClick(e: Event) {
    this.queryField.setValue('');
    this.displayList = false;
  }

}
