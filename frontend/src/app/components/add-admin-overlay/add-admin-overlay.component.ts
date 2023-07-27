import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-admin-overlay',
  templateUrl: './add-admin-overlay.component.html',
  styleUrls: ['./add-admin-overlay.component.css'],
})
export class AddAdminOverlayComponent {
  modalVisible: boolean = true;
  result: string = '';
  email: string = '';

  @Output() updateAdminOverlayVisibility = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  handleOverlayExit() {
    this.updateAdminOverlayVisibility.emit();
  }

  addAdmin(form: any) {
    let url =
      'http://localhost:8080' +
      '/company/' +
      JSON.parse(localStorage.getItem('companyId') as string) +
      '/user/';
    this.http.put<any>(url, form.email).subscribe({
      error: (e) => {
        console.error(e);
        this.result = e.error.message;
      },
      complete: () => {
        this.result = '';
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
    });
  }
}
