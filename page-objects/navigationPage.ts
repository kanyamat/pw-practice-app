import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
export class NavigationPage extends HelperBase{
    // readonly page: Page
    // readonly fromLayoutMenuItem: Locator
    // readonly datePickerMenuItem: Locator
    // readonly smartTabMenuItem: Locator
    // readonly toastrMenuItem: Locator
    // readonly tooltipMenuItem: Locator

    constructor(page: Page){
        // this.page = page
        // this.fromLayoutMenuItem = page.getByText('Form Layouts')
        // this.datePickerMenuItem = page.getByText('Datepicker')
        // this.smartTabMenuItem = page.getByText('Smart Table')
        // this.toastrMenuItem = page.getByText('Toastr')
        // this.tooltipMenuItem = page.getByText('Tooltip')
        super(page)
    }

    async formLayoutsPage(){
        await this.selectGropMenuItem('Forms')
        // await this.fromLayoutMenuItem.click()
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
        await this.selectGropMenuItem('Forms')
        // await this.page.waitForTimeout(1000)
        // await this.datePickerMenuItem.click()
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGropMenuItem('Tables & Data')
        // await this.smartTabMenuItem.click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGropMenuItem('Modal & Overlays')
        // await this.toastrMenuItem.click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGropMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGropMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }
}