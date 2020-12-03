import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CreationModalComponent } from './shared/creation-modal/creation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeanDetailComponent } from './bean-detail/bean-detail.component';
import { QuizComponent } from './quiz/quiz.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { ListBeansComponent } from './list-beans/list-beans.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    ListBeansComponent,
    CreationModalComponent,
    BeanDetailComponent,
    QuizComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [NavBarComponent]
})
export class AppModule { }
