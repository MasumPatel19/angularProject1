import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { DataComponent } from './data/data.component';
import { HeaderComponent } from './home/header/header.component';
import { MainhomeComponent } from './mainhome/mainhome.component';

const routes: Routes = [
  {
    path:'',
    component:MainhomeComponent
  },
  {
    path:'contact',
    component:ContactusComponent
  },
  {
    path:'data',
    component:DataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
