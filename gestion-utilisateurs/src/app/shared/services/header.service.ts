import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private showHeader = new BehaviorSubject<boolean>(true);
  showHeader$ = this.showHeader.asObservable();

  setShowHeader(value: boolean) {
    this.showHeader.next(value);
  }
}
