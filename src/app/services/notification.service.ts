import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private toastSubject = new Subject<any>();
  toastState = this.toastSubject.asObservable();

  showToast(showType: string, message: string) {
    this.toastSubject.next({ showType, message });
  }
}
