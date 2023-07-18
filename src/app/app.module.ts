import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataTableComponent } from "src/app/components/data-table/data-table.component";
import { DataService } from "src/app/services/data.service";
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, DataTableComponent, MainLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
