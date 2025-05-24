import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRunnerComponent } from './process-runner.component';

describe('ProcessRunnerComponent', () => {
  let component: ProcessRunnerComponent;
  let fixture: ComponentFixture<ProcessRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessRunnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
