import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { DetailsComponent } from './details/details.component';



import { ZomatoService } from './zomato.service';
import { LocationComponent } from './location/location.component';
import { AgmCoreModule } from '@agm/core';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LocationComponent,
    DetailsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyCG6PZkjEhf9KGWmRt0aGA3gzonO_GFx2A'
      }
    ),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'location/:locationId/:locationType', component: LocationComponent },
      { path: 'details/:restaurantId', component: DetailsComponent },
      {path :'**',component : ErrorComponent}
    ]

    )
  ],
  providers: [ZomatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
