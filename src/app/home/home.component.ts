import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private apiService: APIService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.apiService.createTodo(this.formData.value).subscribe((data) => {
      this.list?.ngOnInit();
    });
  }

  public onEdit(): void {
    this.apiService.createTodo(this.formData.value).subscribe((data) => {
      console.log('createTodo', data);
    });
  }
}
