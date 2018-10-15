import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MzNavbarModule,
  MzCardModule,
  MzInputModule,
  MzButtonModule,
  MzTextareaModule,
  MzPaginationModule
} from 'ngx-materialize'
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {routes} from './routes';
import {AppComponent} from './app.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {NewRecipeComponent} from './components/new-recipe/new-recipe.component';
import {HeaderComponent} from './components/header/header.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    NewRecipeComponent,
    HeaderComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MzNavbarModule,
    MzCardModule,
    MzInputModule,
    MzTextareaModule,
    MzButtonModule,
    MzPaginationModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
