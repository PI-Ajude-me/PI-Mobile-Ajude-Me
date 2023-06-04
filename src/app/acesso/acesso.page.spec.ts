import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcessoPage } from './acesso.page';

describe('AcessoPage', () => {
  let component: AcessoPage;
  let fixture: ComponentFixture<AcessoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcessoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
