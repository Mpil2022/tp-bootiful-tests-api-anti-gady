import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AddComponent} from "./add/add.component";

const routes = [
  {path: '', redirectTo: 'bootiful', pathMatch: 'full'},
  {path: 'bootiful', component: HomeComponent},
  {path: 'bootiful/add', component: AddComponent},
  {path: '**', redirectTo: 'bootiful', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
