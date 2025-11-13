import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      subject: ['', Validators.required],
      priority: [1, [Validators.required, Validators.min(1)]],
      timeNeeded: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { subject, priority, timeNeeded } = this.taskForm.value;
      this.taskService.addTask(subject, +priority, +timeNeeded);
      this.router.navigate(['/tasks']);
    }
  }
}
