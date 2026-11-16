import { test, expect } from "@playwright/test";
import { mkdir, access } from "node:fs/promises";
import { company, photos, services, processSteps, reviews } from "../src/data/company";
import { formatPrice } from "../src/lib/format-price";

test("адаптивность и загрузка всех фотографий на семи ширинах", async ({ page }) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir("test-results/screenshots", { recursive: true });
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const image of await page.locator("main img:visible").all()) await image.scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("main img:visible").evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
    await page.locator("#top").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/screenshots/${width}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test("мобильное меню: Escape, фокус и переход по якорю", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation").getByRole("link", { name: company.phoneDisplay })).toHaveAttribute("href", `tel:${company.phone}`);
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Услуги", exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator("#mobile-navigation")).toBeHidden();
});

test("галерея: увеличение, смена кадра, клавиатура и возврат фокуса", async ({ page }) => {
  await page.goto("/");
  const image = page.getByRole("button", { name: "Открыть фото: Нанесение защитного состава", exact: true });
  await image.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Далее" }).click();
  await expect(dialog).toContainText("Защита днища");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("Нанесение защитного состава");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(image).toBeFocused();
});

test("до/после: обе исходные композиции и корректное направление сравнения", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#before-after");
  await expect(section.locator(".comparison-item")).toHaveCount(2);
  await expect(section.locator(".comparison-order").first()).toContainText("слева — до, справа — после");
  await expect(section.locator(".comparison-order").last()).toContainText("слева — после, справа — до");
  await expect(section.locator(".comparison-item img").first()).toHaveAttribute("src", photos.headlights.src);
  await section.getByRole("button", { name: "Открыть фото: Полировка кузова" }).click();
  await expect(page.getByRole("dialog").locator(".lightbox-image img")).toHaveAttribute("src", photos.body.src);
  await page.getByRole("dialog").getByRole("button", { name: "Закрыть" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("отзывы Яндекс Карт и Avito свёрстаны с исходными авторами, датами, оценками и источниками", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#reviews");
  const cards = section.locator(".review-card");
  await expect(cards).toHaveCount(13);
  await expect(section.locator("img, button, dialog")).toHaveCount(0);
  await expect(section.getByRole("link", { name: "Отзывы на Яндекс Картах" })).toHaveAttribute("href", company.reviewsUrl);
  await expect(section.getByRole("link", { name: "Отзывы на Avito" })).toHaveAttribute("href", company.avito);
  for (const [i, review] of reviews.entries()) {
    await expect(cards.nth(i).locator("h3")).toHaveText(review.author);
    await expect(cards.nth(i).locator("blockquote")).toHaveText(review.text);
    await expect(cards.nth(i).locator(".review-meta")).toContainText(review.date);
    await expect(cards.nth(i).locator(".review-rating")).toHaveAttribute("aria-label", "Оценка 5 из 5");
    await expect(cards.nth(i).getByRole("link", { name: review.source, exact: true })).toHaveAttribute("href", review.sourceUrl);
  }
  await expect(section.getByText("Закреплённый отзыв", { exact: true })).toHaveCount(1);
});

test("в прайсе шесть услуг, неизвестная стоимость не выдумана", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#prices .price-row");
  await expect(rows).toHaveCount(6);
  for (const [i, service] of services.entries()) {
    await expect(rows.nth(i).locator("h3")).toHaveText(service.title);
    await expect(rows.nth(i).locator("span").last()).toHaveText(formatPrice(service.price));
  }
});

test("в процессе все одиннадцать этапов в предоставленном порядке", async ({ page }) => {
  await page.goto("/");
  const steps = page.locator("#process .process-list li");
  await expect(steps).toHaveCount(11);
  for (const [i, step] of processSteps.entries()) await expect(steps.nth(i).locator("h4")).toHaveText(step.title);
  await expect(steps.nth(6)).toContainText("только на днище и колёсные арки");
  await expect(steps.last()).toContainText("При необходимости");
});

test("вместо формы — прямые ссылки Avito, VK и телефон", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", request => { if (request.url().includes("/api/")) apiCalls.push(request.url()); });
  await page.goto("/");
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
  const cta = page.locator("#contacts");
  await expect(cta.getByRole("link", { name: "Написать на Avito" })).toHaveAttribute("href", company.avito);
  await expect(cta.getByRole("link", { name: "Написать в VK" })).toHaveAttribute("href", company.vk);
  await expect(cta.getByRole("link", { name: company.phoneDisplay })).toHaveAttribute("href", `tel:${company.phone}`);
  await expect(page.locator("#contacts")).toContainText(company.address);
  expect(apiCalls).toEqual([]);
});

test("FAQ удалён, блок контактов один, footer не дублирует контакты", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".faq-section, .faq-item, #contact-us")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Важное. Без лишнего." })).toHaveCount(0);
  await expect(page.locator("section#contacts")).toHaveCount(1);
  await expect(page.getByRole("contentinfo").locator('a[href^="tel:"], a[href*="vk.ru"], a[href*="avito.ru"]')).toHaveCount(0);
  await expect(page.getByRole("contentinfo")).not.toContainText(company.phoneDisplay);
  await expect(page.getByRole("contentinfo")).not.toContainText(company.address);
});

test("нет временных надписей и посторонних фотографий", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText(/стоков|иллюстраци|демонстрацион|предварительная версия|пока не подтвержд|не подключён/iu);
  const sources = await page.locator("img").evaluateAll(images => images.map(image => image.getAttribute("src")));
  expect(sources.every(src => src?.startsWith("/images/optimized/"))).toBe(true);
  await expect(page.locator("svg")).toHaveCount(0);
});

test("контент и прямые контакты доступны без JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#prices .price-row")).toHaveCount(6);
  await expect(page.locator("#contacts").getByRole("link", { name: company.phoneDisplay })).toBeVisible();
  expect(await page.locator(".reveal").evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === "1"))).toBe(true);
  await context.close();
});

test("статический экспорт, SEO и отсутствие API", async ({ page, request }) => {
  await access("out/index.html");
  await access("out/404.html");
  expect((await request.get("/api/leads")).status()).toBe(404);
  expect((await request.get("/privacy/")).status()).toBe(404);
  expect((await request.get("/does-not-exist")).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain("Allow: /");
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(schema.name).toBe(company.name);
  expect(schema.telephone).toBe(company.phone);
  expect(schema.hasOfferCatalog.itemListElement).toHaveLength(6);
  expect(schema).not.toHaveProperty("aggregateRating");
});

test("антикор от 18 000 ₽ в hero, услуге, прайсе, SEO и структурированных данных", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-price")).toContainText("от 18 000 ₽");
  const service = page.locator("#services .service").filter({ has: page.getByRole("heading", { name: "Антикоррозийная обработка", exact: true }) });
  await expect(service.locator(".service-price")).toHaveText("от 18 000 ₽");
  await expect(page.locator("#prices .price-row").first()).toContainText("от 18 000 ₽");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description?.replace(/\s/g, " ")).toContain("от 18 000 ₽");
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(schema.hasOfferCatalog.itemListElement[0].priceSpecification.minPrice).toBe(18000);
  expect(services.find(service => service.id === "polishing")?.price).toBe(5000);
});

test("шумоизоляция с предоставленным фото находится в услугах без вымышленной цены", async ({ page }) => {
  await page.goto("/");
  const card = page.locator('#services article[data-service="soundproofing"]');
  await expect(card.getByRole("heading", { name: "Шумоизоляция авто" })).toBeVisible();
  await expect(card).toContainText("Стоимость по запросу");
  const photo = card.locator("img");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("src", photos.soundproofing.src);
  await expect.poll(() => photo.evaluate(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0)).toBe(true);
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(schema.hasOfferCatalog.itemListElement[5]).not.toHaveProperty("priceSpecification");
});

test("обрезанный отзыв и покупка ASIC не выдаются за полный отзыв об автоуслуге", async ({ page }) => {
  await page.goto("/");
  const kristina = page.locator(".review-card").filter({ has: page.getByRole("heading", { name: "Кристина", exact: true }) });
  await expect(kristina).toContainText("Фрагмент отзыва");
  await expect(kristina.locator("blockquote")).toContainText("…");
  const dmitry = page.locator(".review-card").filter({ has: page.getByRole("heading", { name: "Дмитрий", exact: true }) });
  await expect(dmitry.locator(".review-service")).toContainText("Asic antminer s9i — не автоуслуга");
  await expect(dmitry.getByRole("link", { name: "Avito", exact: true })).toHaveAttribute("href", company.avito);
});

test("внутренние якоря работают, Icons8 больше не используется", async ({ page }) => {
  await page.goto("/");
  const missing = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute("href")!).filter(href => href.length > 1 && !document.getElementById(href.slice(1))));
  expect(missing).toEqual([]);
  await expect(page.locator('a[href*="icons8"], img[src^="/icons/"], link[href^="/icons/"]')).toHaveCount(0);
});

test("фото полировки и фар находятся в соответствующих карточках услуг, а не в галерее", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#works .gallery-item")).toHaveCount(3);
  for (const [id, title, source] of [["polishing", "Полировка", photos.polishingResult.src], ["headlights", "Полировка фар", photos.headlightsPolishing.src]]) {
    const card = page.locator(`#services article[data-service="${id}"]`);
    await expect(card.getByRole("heading", { name: title, exact: true })).toBeVisible();
    const image = card.locator("img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", source);
    await expect.poll(() => image.evaluate(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator(`#works img[src="${source}"]`)).toHaveCount(0);
  }
});

test("процесс читается обычным скроллом без sticky и внутренних прокруток", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const process = page.locator("#process");
  await expect(process.locator(".process-phase")).toHaveCount(3);
  await expect(process.locator(".process-phase > h3")).toHaveText(["Подготовка", "Нанесение защиты", "Завершение"]);
  const traps = await process.locator("*").evaluateAll(elements => elements.filter(element => {
    const style = getComputedStyle(element);
    return style.position === "sticky" || style.position === "fixed" || (/auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1);
  }).length);
  expect(traps).toBe(0);
  await process.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(700, 500);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
});
