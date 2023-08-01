import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent implements OnInit {
  displayedDate = '';
  isAdmin = false;
  @Input() name = '';
  @Input() content = '';
  @Input() date: Date = new Date();
  @Input() title = '';
  @Input() id = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.displayedDate = this.date.toDateString();
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) if (user.admin) this.isAdmin = true;
  }

  delete() {
    return this.http
      .put(`http://localhost:8080/announcements/delete/${this.id}`, null)
      .subscribe({
        error: (e) => console.log(e),
        complete: () => {
          window.location.reload();
        },
      });
  }
}
