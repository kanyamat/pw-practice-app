import { Page, expect } from "@playwright/test";
import {NavigationPage} from '../page-objects/navigationPage'
import { formLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datePickerPage';

export class PageManage{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutPage: formLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new formLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutPage
    }

    ondatepickerPage(){
        return this.datepickerPage
    }
}