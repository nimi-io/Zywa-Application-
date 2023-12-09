import puppeteer from "puppeteer";

class Pdf {
  public async generatePdf(
    email: string,
    htmlString: string
  ): Promise<{ filePath: string; filename: string }> {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });

    await page.setContent(htmlString);

    const filename = `${email}_${Date.now()}.pdf`;
    const filePath = `./generatedPdf/${filename}`;
    await page.pdf({
      path: filePath,
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    console.log("PDF generated successfully!");

    await browser.close();

    return { filename, filePath };
  }
}

export default Pdf;
