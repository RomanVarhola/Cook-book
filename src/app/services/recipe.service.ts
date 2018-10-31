import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import config from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/recipes/`);
  }

  getRecipesByPage(page): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/recipes?page=${page}`);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/recipes/${id}`);
  }

  createRecipe(recipe: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/recipes/`, recipe);
  }

  updateRecipe(recipe: any): Observable<any> {
    return this.http.put(`${config.apiUrl}/recipes/${recipe._id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${config.apiUrl}/recipes/${id}`);
  }
}
