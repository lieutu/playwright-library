import { Page } from "playwright";

export class HomePage {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getHeading(): Promise<string | null> {
    return await this.page.textContent("//a[@rel='home']");
  }
  async getProductCount(): Promise<number> {
    return await this.page.locator("ul.products > li.product").count();
  }
}
