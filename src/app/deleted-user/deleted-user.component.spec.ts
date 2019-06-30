import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedUSerComponent } from './deleted-user.component';

describe('DeletedUSerComponent', () => {
  let component: DeletedUSerComponent;
  let fixture: ComponentFixture<DeletedUSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedUSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
