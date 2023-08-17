import { Component, Output, EventEmitter } from '@angular/core';
import {Task} from '../../Task';
import {UiService} from '../../services/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  constructor(private uiService : UiService){
    this.subscription = this.uiService.onToggle().subscribe(v => this.showAddTask=v);
  }

  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();

  text!:string;
  day!:string;
  reminder:boolean = false;
  showAddTask!:boolean;
  subscription!:Subscription;

  onSubmit(){
    if(!this.text){
      alert('Please add a Task');
      return;
    }

    const newTask = {
      text : this.text,
      day : this.day,
      reminder : this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text='';
    this.day='';
    this.reminder=false;
  }


}
