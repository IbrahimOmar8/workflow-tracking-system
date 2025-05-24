import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationLogComponent } from './validation-log.component';

describe('ValidationLogComponent', () => {
  let component: ValidationLogComponent;
  let fixture: ComponentFixture<ValidationLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
