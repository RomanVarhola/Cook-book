import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  public recipes: Recipe[];
  public total: number;
  public limit: number;
  public page: number;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe((res: any) => {
        this.getData(res.data);
      });
  }

  getRecipesByPage(page): void {
    this.recipeService.getRecipesByPage(page)
      .subscribe((res: any) => {
        this.getData(res.data);
      });
  }

  getData(res): void {
    this.recipes = res.recipes;
    this.total = res.total;
    this.limit = res.limit;
    this.page = res.page;
  }
}
