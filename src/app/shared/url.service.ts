import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  static uri_api = 'https://back-assignments-jese-lionel.onrender.com/';
  // static uri_api = 'http://localhost:6750/';
  constructor() {}
}
