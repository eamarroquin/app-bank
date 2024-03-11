import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorage: LocalStorageService, private router: Router) { }

  canActivate() {

      if (this.localStorage.isLoggedIn()) {
          return true;
      }

      this.router.navigate(['auth/login']);

      return false;

  }

}
