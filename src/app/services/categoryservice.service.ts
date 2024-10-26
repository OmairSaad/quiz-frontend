import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  constructor(private _htttp: HttpClient) { }

  public getCategories(){
   return this._htttp.get<Category[]>(`${baseURL}/category/`);
  }

  public addCategory(category:any){
    return this._htttp.post(`${baseURL}/category/`,category);
  }
}
