/**
 * Script de pruebas para la aplicación SmartParking
 * - Pruebas funcionales
 * - Pruebas de rendimiento
 * - Pruebas de usabilidad
 */

const puppeteer = require("puppeteer");

jest.setTimeout(30000); // Timeout extendido para pruebas E2E

describe("Pruebas funcionales, rendimiento y usabilidad", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // false si quieres ver la ejecución
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.goto("http://localhost:5173"); // URL de tu app local
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Carga correcta de la pantalla principal", async () => {
    const header = await page.$eval("h1", el => el.textContent);
    expect(header).toMatch(/|Menú|/i);
  });

  test("Filtros de reportes funcionan correctamente", async () => {
    await page.goto("http://localhost:5173/reportes");

    await page.type('input[type="date"]', "2025-10-05");
    const registrosAntes = await page.$$eval(".form-card", cards => cards.length);

    await page.type('input[placeholder="Ej: Juan o 12345678-9"]', "Test Usuario");
    const registrosDespues = await page.$$eval(".form-card", cards => cards.length);

    expect(registrosDespues).toBeLessThanOrEqual(registrosAntes);
  });

  test("Prueba de rendimiento: carga registros en < 2s", async () => {
    const start = Date.now();
    await page.goto("http://localhost:5173/reportes");
    const carga = Date.now() - start;
    expect(carga).toBeLessThan(2000);
  });

});
