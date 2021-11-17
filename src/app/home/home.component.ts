import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { ListComponent } from '../list/list.component';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('list') list: ListComponent | undefined;

  public formData = this.fb.group({
    name: ['', Validators.required]
  });

  public message = { style: '', msg: '' };
  public editForm = false;
  public editId: any;

  constructor(private fb: FormBuilder, private apiService: APIService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.formData.valid) {    
      this.apiService.createTodo(this.formData.value).subscribe((data) => {
        this.list?.ngOnInit();
        this.replacecInputValue('');
        this.message = { style: 'success', msg: 'item added to the list'};
      });
    } else {
      this.message = { style: 'danger', msg: 'please enter value'};
    }

    this.autoCloseAlert();
  }

  public onEdit(id: number): void {
    if (this.formData.valid) {  
      this.apiService.updateTodo(id, this.formData.value).subscribe((data) => {
        this.list?.ngOnInit();
        this.replacecInputValue('');
        this.editForm = false;
        this.editId = null;
        this.message = { style: 'success', msg: 'value changed'};
      });
    } else {
      this.message = { style: 'danger', msg: 'please enter value'};
    }
    
    this.autoCloseAlert();
  }

  public onDelete(id: number): void {
    this.apiService.deleteTodo(id).subscribe((data) => {
      this.list?.ngOnInit();
      this.replacecInputValue('');
      this.message = { style: 'danger', msg: 'item removed'};
    });

    this.autoCloseAlert();
  }

  public async clearAll(ids: number[]) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      this.apiService.deleteTodo(id).subscribe();
    }
  }

  public onClear(ids: number[]) {
    this.clearAll(ids).then((value) =>{
      this.list?.ngOnInit();
      this.replacecInputValue('');
      this.editForm = false;
      this.editId = null;
      this.message = { style: 'danger', msg: 'empty list'};
      this.autoCloseAlert();
    });
  }

  public binding(id: number) {
    this.editForm = true;
    this.editId = id;
    this.apiService.getTodo(id).subscribe((data) => {
      this.replacecInputValue(data.name);
    });
  }

  public replacecInputValue(value: string) {
    this.formData = this.fb.group({
      name: [value, Validators.required]
    });
  }

  public autoCloseAlert() {
    setTimeout(() => {
      this.message = { style: '', msg: ''};
    }, 3000);
  }
}
