/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { BreadcrumbsComponent } from '../shared/genesis-ui/breadcrumb.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { SidebarComponent } from './sidebar/sidebar.component'

import { ViabilityComponent } from './viability.component';

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

@Component({
  selector: 'app-sidebar',
  template: 'overide sidebar'
})
class EmptySidebarComponent { }

describe('ViabilityComponent', () => {
  let fixture: ComponentFixture<ViabilityComponent>;
  
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
        SidebarComponent,
        EmptySidebarComponent,
        ViabilityComponent
      ]
    })
      .overrideDirective(BreadcrumbsComponent, EmptyBreadCrumbsComponent)
      .overrideDirective(FooterComponent, EmptyFooterComponent)
      .overrideDirective(SidebarComponent, EmptySidebarComponent)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilityComponent);
  });

  it('should create viability component', () => {
    let component: ViabilityComponent = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should render empty component instead of app-sidebar component, with text "overide sidebar" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-sidebar').textContent).toContain('overide sidebar');
  }));
});
