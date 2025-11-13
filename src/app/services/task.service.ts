import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  subject: string;
  priority: number;
  timeNeeded: number;
  completed: boolean;
}

const TASKS_KEY = 'study_tasks';
const NEXT_ID_KEY = 'study_tasks_next_id';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;
  private heap: Task[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    const nextIdStr = localStorage.getItem(NEXT_ID_KEY);
    this.tasks = tasksJson ? JSON.parse(tasksJson) : [];
    this.nextId = nextIdStr ? +nextIdStr : 1;
    this.rebuildHeap();
  }

  private saveToStorage() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
    localStorage.setItem(NEXT_ID_KEY, this.nextId.toString());
    this.rebuildHeap();
  }

  private rebuildHeap() {
    this.heap = this.tasks.filter(t => !t.completed);
    // Heapify
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }

  addTask(subject: string, priority: number, timeNeeded: number): Task {
    const task: Task = {
      id: this.nextId++,
      subject,
      priority,
      timeNeeded,
      completed: false,
    };
    this.tasks.push(task);
    this.saveToStorage();
    return task;
  }

  editTask(id: number, subject: string, priority: number, timeNeeded: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return false;
    task.subject = subject;
    task.priority = priority;
    task.timeNeeded = timeNeeded;
    this.saveToStorage();
    return true;
  }

  deleteTask(id: number): boolean {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    this.saveToStorage();
    return true;
  }

  markCompleted(id: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return false;
    task.completed = true;
    this.saveToStorage();
    return true;
  }

  getActiveTasks(): Task[] {
    return this.heap.slice().sort((a, b) => a.priority - b.priority);
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[idx].priority < this.heap[parent].priority) {
        [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
        idx = parent;
      } else {
        break;
      }
    }
  }

  private bubbleDown(idx: number) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;
      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      if (smallest !== idx) {
        [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}
