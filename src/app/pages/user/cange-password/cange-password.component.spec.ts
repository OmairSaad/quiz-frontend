import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CangePasswordComponent } from './cange-password.component';

describe('CangePasswordComponent', () => {
  let component: CangePasswordComponent;
  let fixture: ComponentFixture<CangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
