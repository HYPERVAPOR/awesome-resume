const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureGithubCalendar() {
  console.log('🚀 Start capturing GitHub contribution calendar...');
  
  // Launch browser with system Chrome
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // 使用系统已安装的 Chrome
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    // 如果上面的路径不存在，可以尝试其他常见路径
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  });
  
  try {
    // Create new page
    const page = await browser.newPage();
    
    // Set viewport size and scale
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
    
    // Get absolute path of HTML file
    const htmlPath = path.join(__dirname, 'test.html');
    const fileUrl = `file://${htmlPath}`;
    
    console.log('📄 Loading HTML file:', fileUrl);
    
    // Navigate to HTML file and wait for DOM content loaded
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    
    console.log('⏳ Waiting for page to render...');
    
    // Wait for the contribution calendar table element to appear
    await page.waitForSelector('.ContributionCalendar-grid.js-calendar-graph-table', { timeout: 10000 });
    
    // Wait a short time for the page to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('🔍 Waiting for GitHub calendar data to load...');
    
    // Wait until the loading text disappears
    await page.waitForFunction(() => {
      const loadingText = document.querySelector('.calendar');
      if (!loadingText) return false;
      
      // Check if loading text is present
      const hasLoadingText = loadingText.textContent.includes('Loading the data just for you.');
      return !hasLoadingText;
    }, { timeout: 30000 }); // 30 seconds timeout
    
    console.log('✅ GitHub calendar data loaded!');
    
    // Wait a bit more to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the contribution calendar table element
    const calendarElement = await page.$('.ContributionCalendar-grid.js-calendar-graph-table');
    
    if (!calendarElement) {
      throw new Error('Contribution calendar table element not found');
    }
    
    // Ensure assets directory exists
    const assetsDir = path.join(__dirname, '..', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    // Screenshot output path
    const outputPath = path.join(assetsDir, 'github-contributions.png');
    
    console.log('📸 Capturing screenshot...');
    
    // Capture screenshot of the calendar part
    await calendarElement.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: false
    });
    
    console.log('✅ Screenshot saved to:', outputPath);
    
    // Get file size
    const stats = fs.statSync(outputPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 File size: ${fileSizeInKB} KB`);
    
  } catch (error) {
    console.error('❌ Error during screenshot:', error.message);
    throw error;
  } finally {
    // Close browser
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

// Run script
if (require.main === module) {
  captureGithubCalendar()
    .then(() => {
      console.log('🎉 GitHub calendar screenshot task completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Task failed:', error);
      process.exit(1);
    });
}

module.exports = { captureGithubCalendar };
