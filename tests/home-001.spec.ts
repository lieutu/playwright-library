import { chromium } from "playwright";
import * as dotenv from "dotenv";
import { HomePage } from "../pages/home.page";

dotenv.config();

async function runHomeTest(env: "dev" | "prod", tags: string[]) {
  console.log(`\nTags: [${tags.join(", ")}]`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const homePage = new HomePage(page);

  const baseURL = env === "dev" ? process.env.DEV_URL : process.env.PROD_URL;
  const expectedTitle =
    env === "dev"
      ? "E-commerce site for automation testing – E-commerce site for automation testing"
      : "Automation test site – Automation test site";
  const expectedHeading =
    env === "dev"
      ? "E-commerce site for automation testing"
      : "Automation test site";
  const expectedProductCount = env === "dev" ? 3 : 5;
  await homePage.goto(baseURL || "dev");

  // Check Title
  const actualTitle = await homePage.getTitle();
  actualTitle === expectedTitle
    ? console.log("Title is correct")
    : console.error(
        `Title mismatch. Expected: "${expectedTitle}", Got: "${actualTitle}"`
      );

  // Check Heading
  const actualHeading = (await homePage.getHeading())?.trim();
  actualHeading === expectedHeading
    ? console.log("Heading is correct")
    : console.error(
        `Heading mismatch. Expected: "${expectedHeading}", Got: "${actualHeading}"`
      );

  // Check Product Count
  const actualProductCount = await homePage.getProductCount();
  actualProductCount === expectedProductCount
    ? console.log(`Product count correct: ${actualProductCount}`)
    : console.error(
        `Product count mismatch. Expected: ${expectedProductCount}, Got: ${actualProductCount}`
      );
  await browser.close();
}
(async () => {
  await runHomeTest("dev", ["HOME_001", "Smoke", "UI"]);
  console.log("\n---------------------------\n");
  await runHomeTest("prod", ["HOME_001", "Smoke", "UI"]);
})();
