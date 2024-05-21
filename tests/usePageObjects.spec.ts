import {expect, test} from '@playwright/test';
// import {NavigationPage} from '../page-objects/navigationPage'
// import { formLayoutsPage } from '../page-objects/formLayoutsPage';
// import { DatepickerPage } from '../page-objects/datePickerPage';
import { PageManage } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    // await page.goto('http://localhost:4200/')
    await page.goto('/')
})

test('navigate to form page',async ({page}) => {
    // const navigateTo = new NavigationPage(page)
    const pm = new PageManage(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new formLayoutsPage(page)
    // const onDatePickerPage = new DatepickerPage(page)
    const pm = new PageManage(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`


    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)  // ถ้าเปลี่ยนจาก true เป็น false จะไม่ติ๊ก checkbox remember me
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.ondatepickerPage().selectCommonDatePickerDateFormToday(10)
    await pm.ondatepickerPage().selectDatePickerWithRangerFromToday(6, 15)
})
