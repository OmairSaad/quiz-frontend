import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAttemptedQuizComponent } from './show-attempted-quiz.component';

describe('ShowAttemptedQuizComponent', () => {
  let component: ShowAttemptedQuizComponent;
  let fixture: ComponentFixture<ShowAttemptedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAttemptedQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAttemptedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
