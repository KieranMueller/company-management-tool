import { Component, Input } from '@angular/core';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {

  @Input() project: ProjectDto = new ProjectDto();
  daysAgo: number = 0;

  ngOnInit() {
    this.daysAgo = (() => {
    let date1 = new Date(this.project.date);
    let date2 = new Date();
    
    console.log(this.project.date)
    console.log(date2)
    let millDifference = date2.getTime() - date1.getTime();
      
    return Math.floor(millDifference / (1000 * 3600 * 24));
    })()
  }
}
