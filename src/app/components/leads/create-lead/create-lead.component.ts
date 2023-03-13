import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeadsService } from '../../../services/leads.service';
import { Router } from '@angular/router';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';
import { Observable, shareReplay, take, tap } from 'rxjs';
import { LeadsActivitiesResponse } from '../../../models/leads/resposne/leads-activities.response';
import { CreateLeadRequest } from '../../../models/leads/request/create-lead.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeadValidators } from '../lead-validators/lead-validators';

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLeadComponent {
  public readonly createLeadForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    websiteLink: new FormControl('', [
      Validators.required,
      LeadValidators.websiteLink,
    ]),
    linkedinLink: new FormControl('', [
      Validators.required,
      LeadValidators.linkedinLink,
    ]),
    industry: new FormControl('', [Validators.required]),
    annualRevenue: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required, Validators.min(1)]),
    dev: new FormControl('', [Validators.required, Validators.min(1)]),
    fe: new FormControl('', [Validators.required, Validators.min(1)]),
    active: new FormControl(false),
    junior: new FormControl(false),
    talentProgram: new FormControl(false),
    notes: new FormControl(''),
  });
  public readonly activityScopeFormGroup: FormGroup = new FormGroup({});

  public readonly leadsActivities$: Observable<LeadsActivitiesResponse[]> =
    this._leadsService.getLeadsActivities().pipe(
      tap((activities) => {
        activities.forEach((activity) =>
          this.activityScopeFormGroup.addControl(
            activity.id,
            new FormControl(false)
          )
        );
      }),
      shareReplay(1)
    );

  public formBackendErrorMessage: string = '';

  constructor(
    private readonly _leadsService: LeadsService,
    private readonly _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  public onCreateLead(): void {
    const checkedActivityArray = Object.keys(
      this.activityScopeFormGroup.value
    ).filter(
      (activity) => this.activityScopeFormGroup.value[activity] === true
    );
    if (checkedActivityArray.length === 0) {
      this.createLeadForm.setErrors({ noActivitySelected: true });
      this._cdr.detectChanges();
    }
    if (this.createLeadForm.invalid) {
      return;
    }
    const {
      name,
      location,
      websiteLink,
      linkedinLink,
      industry,
      annualRevenue,
      total,
      dev,
      fe,
      active,
      junior,
      talentProgram,
    } = this.createLeadForm.getRawValue();
    const createLeadRequest: CreateLeadRequest = {
      name: name,
      location: location,
      websiteLink: websiteLink,
      linkedinLink: linkedinLink,
      industry: industry,
      annualRevenue: annualRevenue,
      companySize: {
        total: total,
        dev: dev,
        fe: fe,
      },
      hiring: {
        active: active,
        junior: junior,
        talentProgram: talentProgram,
      },
      activityIds: checkedActivityArray,
    };

    this._leadsService
      .createLeadActivity(createLeadRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.navigateToLeads();
        },
        error: (e) => {
          this.formBackendErrorMessage = e.error.message;
          this.createLeadForm.setErrors({ backendError: true });
          this._cdr.detectChanges();
        },
      });
  }

  public onActivitySelect(): void {
    this.createLeadForm.setErrors({});
    this.createLeadForm.updateValueAndValidity();
  }

  public navigateToLeads(): void {
    this._router.navigateByUrl(ROUTES_DEF.LEADS);
  }
}
