import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import {SoftwaresComponent} from './pages/softwares/softwares.component';
import {ScanResultsComponent} from "./pages/scan-results/scan-results.component";
import {ProfileComponent} from "./pages/profile/profile.component";

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        UsersComponent,
        NewBookingComponent,
        BookingListComponent,
        DashboardComponent,
        RegisterComponent,
        SoftwaresComponent,
        ScanResultsComponent,
        ProfileComponent,
    ],
    bootstrap: [AppComponent],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,],
  providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
