import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNoteComponent } from './base.component';

describe('BaseNoteComponent', () => {
  let component: BaseNoteComponent;
  let fixture: ComponentFixture<BaseNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
