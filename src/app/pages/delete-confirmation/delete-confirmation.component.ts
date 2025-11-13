import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css',
})
export class DeleteConfirmationComponent {
  task: Task | undefined;
  notFound = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.task = this.taskService.getTaskById(+id);
        if (!this.task) {
          this.notFound = true;
        }
      }
    });
  }

  confirmDelete() {
    if (this.task) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/tasks']);
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
