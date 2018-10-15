import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {NewRecipeComponent} from './components/new-recipe/new-recipe.component';
import {LogInComponent} from './components//log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {AuthGuard} from './guards/auth.guard';

export const routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipe/create',
    component: NewRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LogInComponent
  }
  ,
  {
    path: 'signup',
    component: SignUpComponent
  },
];
