import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LeadsService } from '../../../services/leads.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { LeadsQueryModel } from '../../../models/leads/query-models/leads.query-model';
import { LeadsResponse } from '../../../models/leads/resposne/leads.response';
import { LeadsActivitiesResponse } from '../../../models/leads/resposne/leads-activities.response';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterActivitiesQueryModel } from '../../../models/leads/query-models/filter-activities.query-model';
import {
  FilterSizeModel,
  FilterSizeQueryModel,
} from '../../../models/leads/query-models/filter-size.query-model';
import { UserService } from '../../../services/user.service';
import { USER_ROLES } from '../../../congifuration/user-roles';
import {Router} from "@angular/router";
import {ROUTES_DEF} from "../../../congifuration/routes-definition";

@Component({
  selector: 'app-leads-main',
  styleUrls: ['./leads-main.component.scss'],
  templateUrl: './leads-main.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsMainComponent implements OnInit {
  public activityScopeFormGroup: FormGroup = new FormGroup({});
  public sizeFilterFormGroup: FormGroup = new FormGroup({});

  public readonly userRoles = USER_ROLES;
  public userRole$: Observable<string> = this._userService.getUserRole();

  private _filterModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public filterModal$: Observable<boolean> =
    this._filterModalSubject.asObservable();

  public leadsActivities$: Observable<LeadsActivitiesResponse[]> =
    this._leadsService.getLeadsActivities().pipe(
      tap((activities) => {
        activities.forEach((activity) =>
          this.activityScopeFormGroup.addControl(
            activity.id,
            new FormControl(false)
          )
        );
      })
    );

  public readonly sizeFilterLimit: FilterSizeModel[] = [
    {
      min: 0,
      max: 50,
    },
    {
      min: 51,
      max: 100,
    },
    {
      min: 101,
      max: 500,
    },
    {
      min: 501,
      max: 1000,
    },
    {
      min: 1001,
    },
  ];

  public readonly leadsList$: Observable<LeadsQueryModel[]> = combineLatest([
    this._leadsService.getLeads(),
    this.leadsActivities$,
    this.activityScopeFormGroup.valueChanges.pipe(startWith({})),
    this.sizeFilterFormGroup.valueChanges.pipe(startWith({})),
  ]).pipe(
    map(
      ([leads, leadsActivities, filterActivities, filterSize]: [
        LeadsResponse[],
        LeadsActivitiesResponse[],
        FilterActivitiesQueryModel,
        FilterSizeQueryModel
      ]) => {
        const activitiesMap = leadsActivities.reduce((a, c) => {
          return { ...a, [c.id]: c };
        }, {}) as Record<string, LeadsActivitiesResponse>;

        const checkedActivityArray = Object.keys(filterActivities).filter(
          (activity) => filterActivities[activity] === true
        );
        const checkedSizeArray = Object.keys(filterSize).filter(
          (size) => filterSize[size] === true
        );

        const sizeValues: FilterSizeModel[] = [];
        checkedSizeArray.forEach((element) =>
          sizeValues.push(this.sizeFilterLimit[+element])
        );

        return leads
          .filter((lead) =>
            this._filterByActivityScope(lead, checkedActivityArray)
          )
          .filter((lead) => this._filterBySize(lead, sizeValues))
          .map((lead) => ({
            name: lead.name,
            hiring: lead.hiring,
            activities: lead.activityIds.map((id) => activitiesMap[id]),
            linkedinLink: lead.linkedinLink,
            industry: lead.industry,
            annualRevenue: lead.annualRevenue,
            companySize: lead.companySize,
            websiteLink: lead.websiteLink,
            location: lead.location,
          }));
      }
    )
  );

  constructor(
    private readonly _leadsService: LeadsService,
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._setSizeFilterFormGroup();
  }

  public openFilterModal(): void {
    this._filterModalSubject.next(true);
  }

  public closeFilterModal(): void {
    this._filterModalSubject.next(false);
  }

  public resetFilters(): void {
    this.activityScopeFormGroup.reset();
    this.sizeFilterFormGroup.reset();
  }

  public navigateToCreateLead(): void {
    this._router.navigateByUrl(ROUTES_DEF.CREATE_LEAD)
  }

  private _setSizeFilterFormGroup(): void {
    this.sizeFilterLimit.forEach((element, index) =>
      this.sizeFilterFormGroup.addControl(
        index.toString(),
        new FormControl(false)
      )
    );
  }

  private _filterByActivityScope(
    lead: LeadsResponse,
    checkedActivityArray: string[]
  ): boolean {
    return checkedActivityArray.length > 0
      ? lead.activityIds.some((l) => checkedActivityArray.includes(l))
      : true;
  }

  private _filterBySize(
    lead: LeadsResponse,
    checkedSizeValues: FilterSizeModel[]
  ): boolean {
    return checkedSizeValues.length > 0
      ? checkedSizeValues.some((size) =>
          size.max
            ? lead.companySize.total >= size.min &&
              lead.companySize.total <= size.max
            : lead.companySize.total >= size.min
        )
      : true;
  }
}
