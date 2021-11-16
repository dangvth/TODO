import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

}
