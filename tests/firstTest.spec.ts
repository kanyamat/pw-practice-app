import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules',async ({page}) => {
    // by Tag name
    await page.locator('input').first().click()
    // by ID
    page.locator('#inputEmail1')
    // by Class value
    page.locator('.shape-rectangle')
    // by attribute
    page.locator('[placeholder="Email"]')
    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    // combile different selectors
    page.locator('input[placeholder="Email"][nbinput]')
    // by XPath (NOT RECOMMEND)
    page.locator('//*[@id="inputEmail1"]')
    // by partial text match
    page.locator(':text("Using")')
    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locator',async ({page}) => {
    await page.getByRole('textbox', {name:"Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('SignIn').click()            //<button data-testid="SignIn" type="submit" nbButton status="primary">Sign in</button>
})

test('locating child elements',async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()    // click ปุ่มที่ 3 เริ่มนับที่ 1 2 3
})

test('locating parent elements',async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:"Email"}).click()     // xpath
})

test('Reusing the locator',async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name:"Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name:"Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values',async ({page}) => {        // ทำตัวแปรแยกมาก่อน แล้วเหมือนเป็นการเช็กว่ามีค่านั้นไหม
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    // input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions',async ({page}) => {       // เช็กว่ามีค่านั้นไหม
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    // General assertions
    const value = 5
    expect(value).toEqual(5)
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Doft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})