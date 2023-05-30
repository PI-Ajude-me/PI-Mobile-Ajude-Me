import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HankingPage } from './hanking.page';

describe('HankingPage', () => {
  let component: HankingPage;
  let fixture: ComponentFixture<HankingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
