import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public todos  = [
    { name: '', id: 0}
  ];
  public faEdit= faEdit;
  public faTrash= faTrashAlt;
  private ids: number[] = [];

  @Output() editCall: EventEmitter<any> = new EventEmitter();
  @Output() deleteCall: EventEmitter<any> = new EventEmitter();
  @Output() clearCall: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  public onEdit(id:number) {
    this.editCall.emit(id);
  }
  
  public onDelete(id:number) {
    this.deleteCall.emit(id);
  }

  public onClear() {
    this.todos.forEach(todo => {
      this.ids.push(todo.id);
    });
    this.clearCall.emit(this.ids);
  }
}
