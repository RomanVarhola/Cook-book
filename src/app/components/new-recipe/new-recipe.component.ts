import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  public newRecipe: FormGroup;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newRecipe = this.formBuilder.group({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  createRecipe(): void {
    this.recipeService.createRecipe(this.newRecipe.value)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
