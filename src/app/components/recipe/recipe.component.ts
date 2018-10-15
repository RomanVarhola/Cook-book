import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Recipe} from './../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  public recipeForm: FormGroup;
  public recipe: Recipe;
  private routeId: string;
  public errors: Object = {};

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRecipe();
    this.createForm();
  }

  getRecipe(): void {
    this.recipeService.getRecipe(this.routeId)
      .subscribe(res => {
        this.recipe = res.data.recipe;
        this.recipeForm.patchValue(res.data.recipe);
      });
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.routeId)
      .subscribe((val) => {
        this.router.navigate(['/recipes']);
      })
  }

  submitForm() {
    this.updateRecipe(this.recipeForm.value);

    this.recipeService.updateRecipe(this.recipe)
      .subscribe(recipe => {
          this.getRecipe();
        },
        err => {
          this.errors = err;
        }
      );
  }

  updateRecipe(values: Object): void {
    Object.assign(this.recipe, values);
  }
  
  createForm() {
    this.recipeForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }
}
