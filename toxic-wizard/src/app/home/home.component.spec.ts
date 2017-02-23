/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { BreadcrumbsComponent } from '../shared/genesis-ui/breadcrumb.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { HomeComponent } from './home.component';

@Component({
  selector: 'breadcrumbs',
  template: 'overide breadcrumbs'
})
class EmptyBreadCrumbsComponent { }

@Component({
  selector: 'app-footer',
  template: 'overide footer'
})
class EmptyFooterComponent { }

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        BreadcrumbsComponent,
        EmptyBreadCrumbsComponent,
        FooterComponent,
        EmptyFooterComponent,
        HomeComponent
      ]
    })
      .overrideDirective(BreadcrumbsComponent, EmptyBreadCrumbsComponent)
      .overrideDirective(FooterComponent, EmptyFooterComponent)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component instead of breadcrumb component, with text "overide breadcrumbs" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('breadcrumbs').textContent).toContain('overide breadcrumbs');
  }));

  it('should render empty component instead of app-footer component, with text "overide footer" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer').textContent).toContain('overide footer');
  }));
});
