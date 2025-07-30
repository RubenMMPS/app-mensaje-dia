import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpleNatComponent } from './cumple-nat.component';

describe('CumpleNatComponent', () => {
  let component: CumpleNatComponent;
  let fixture: ComponentFixture<CumpleNatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CumpleNatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumpleNatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
