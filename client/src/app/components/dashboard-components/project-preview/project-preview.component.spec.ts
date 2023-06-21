import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPreview } from './project-preview.component';

describe('ProjectsComponent', () => {
  let component: ProjectPreview;
  let fixture: ComponentFixture<ProjectPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
