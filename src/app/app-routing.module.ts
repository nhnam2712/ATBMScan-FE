import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RegisterComponent } from './pages/register/register.component';
import {SoftwaresComponent} from './pages/softwares/softwares.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'',
    component:LayoutComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'softwares',
        component:SoftwaresComponent
      },
      {
        path:'newBooking',
        component:NewBookingComponent
      },
      {
        path:'bookings',
        component:BookingListComponent
      },
      {
        path:'users',
        component:UsersComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
