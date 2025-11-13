import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  taskForm: FormGroup;
  taskId: number | null = null;
  notFound = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      subject: ['', Validators.required],
      priority: [1, [Validators.required, Validators.min(1)]],
      timeNeeded: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        const task = this.taskService.getTaskById(this.taskId);
        if (task) {
          this.taskForm.patchValue({
            subject: task.subject,
            priority: task.priority,
            timeNeeded: task.timeNeeded,
          });
        } else {
          this.notFound = true;
        }
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid && this.taskId !== null) {
      const { subject, priority, timeNeeded } = this.taskForm.value;
      this.taskService.editTask(this.taskId, subject, +priority, +timeNeeded);
      this.router.navigate(['/tasks']);
    }
  }
}
