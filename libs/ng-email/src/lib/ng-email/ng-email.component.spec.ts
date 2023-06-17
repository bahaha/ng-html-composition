import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgEmailComponent } from './ng-email.component';

describe('NgEmailComponent', () => {
  let component: NgEmailComponent;
  let fixture: ComponentFixture<NgEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
