import { Component, OnInit } from '@angular/core';
import {Task} from '../../Task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor(private taskService: TaskService){

  }

  tasks:Task[] = [];

  ngOnInit(): void{
    this.taskService.getTasks().subscribe((tasks)=> this.tasks=tasks);
  }

  deleteTask(task : Task){
    this.taskService.deleteTask(task).subscribe(()=> this.tasks=this.tasks.filter(t => t.id!=task.id));
  }

  toggleReminder(task : Task){
    task.reminder=!task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task:Task){
    task.id=this.tasks.length+1;
    this.taskService.addTask(task).subscribe(()=> {this.tasks.push(task)});
  }
}
