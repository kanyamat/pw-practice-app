import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";
export class DatepickerPage extends HelperBase{

    // private readonly page: Page
    constructor(page: Page){
        // this.page = page
        super(page)
    }

    async selectCommonDatePickerDateFormToday(numberOfDaysFormToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const datetoAssert = await this.selectDateInTheCalendar(numberOfDaysFormToday)
        await expect(calendarInputField).toHaveValue(datetoAssert)
    }

    async selectDatePickerWithRangerFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const datetoAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const datetoAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${datetoAssertStart} - ${datetoAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar (numberOfDaysFormToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFormToday) // date +เพิ่มไปอีก200วันข้างหน้า
        const expectedDate = date.getDate().toString() // getDate เอาวันที่ออกมา (13)
        const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const datetoAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        // await this.page.locator('[Class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact:true}).click()
        return datetoAssert
    }
}
