 class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

    init() {
    const element = document.createElement("style");
    document.head.appendChild(element);
    const sheet = element.sheet;

    const troika = '@font-face { font-family: "troika"; src: url("https://game.deepsign.in/assets/gogono-cocoa-mochi-cyrillic.otf") format("opentype"); }';
    const caroni = '@font-face { font-family: "Caroni"; src: url("assets/KardinalPro-ExtraBold.ttf") format("truetype"); }';

    sheet.insertRule(troika, 0);
    sheet.insertRule(caroni, 1);
  }

  
  preload() {
   const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 🎨 Loading text
    this.startloadtext = this.add.text(centerX, centerY - 80, 'Loading assets...', {
      fontFamily: 'Comic Sans MS',
      fontSize: '32px',
      fill: '#ffffff',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // 📦 Progress box (border/background)
    const boxWidth = 300;
    const boxHeight = 40;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x444444, 1);
    progressBox.fillRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 12);

    // 🟩 Progress bar (the green filler)
    const progressBar = this.add.graphics();

    // 🔁 On progress
    this.load.on('progress', (value) => {
      progressBar.clear();

      // Outer stroke
      progressBar.lineStyle(4, 0x006400, 1);
      progressBar.strokeRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 12);

      // Inner green fill
      progressBar.fillStyle(0x00ff00, 1); // bright green
      progressBar.fillRoundedRect(centerX - boxWidth / 2 + 2, centerY - boxHeight / 2 + 2, (boxWidth - 4) * value, boxHeight - 4, 10);
    });

    this.load.on('complete', () => {
      // loadingText.destroy();
      // progressBar.destroy();
      // progressBox.destroy();
    });

    // ✅ Load all your assets here (used by any scene)

     // const origin = "https://web-share.thetunagroup.com/phaser"
    // const origin = "https://phaser";

    // let origin = "http://127.0.0.1:5500/"

    // if(window.location.origin == "https://web-share.thetunagroup.com") {
    //   origin = "https://web-share.thetunagroup.com/phaser/"
    // }
    // if(window.location.origin == "https://game.deepsign.in") {
    //   origin = "https://game.deepsign.in/"
    // }


    // origin = "https://game.deepsign.in/"
    console.log(location.origin);


    // this.load.atlas("ui", "https://game.deepsign.in/assets/common1.png", "https://game.deepsign.in/assets/common1.json");

    var origin = "https://jolly-kelpie-ea4c99.netlify.app/"


        this.load.image("bg", origin + "assets/bg2.jpg");
    this.load.image("logo", origin + "assets/logo.png");

    
    // this.load.atlas("ui", "https://game.deepsign.in/assets/common1.png", "https://game.deepsign.in/assets/common1.json");
        this.load.atlas(
      "ui",
      origin + "/assets/common1.png",
      origin + "/assets/common1.json"
    );
    this.load.atlas("ui2", origin +"assets/common2.png", origin +"assets/common2.json");
    this.load.image("background", origin +"assets/bg (1).jpg");
    this.load.image("tryfail", origin +"assets/images-removebg-preview.png");
    this.load.image("particle", origin +"assets/white.png");

    this.load.audio("add_star", origin +"assets/add_star.mp3");
    this.load.audio("free_main1", origin +"assets/free_main1.mp3");
    this.load.audio("button_click", origin +"assets/button_click.mp3");
    this.load.audio("button_over", origin +"assets/button_over.mp3");
    this.load.audio("token", origin +"assets/token.mp3");
    this.load.audio("error", origin +"assets/error.mp3");
    this.load.atlas("flares", origin +"assets/flares.png", origin +"assets/flares.json");

    // Add more assets as needed...
  }

  async  create() {

         this.startloadtext.destroy();

 const loadingText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY - 80,
    "Loading fonts...",
    {
      fontFamily: "Comic Sans MS",
      fontSize: "32px",
      fill: "#ffffff",
      stroke: "#000",
      strokeThickness: 4
    }
  ).setOrigin(0.5);
       await Promise.all([
      document.fonts.load('16px troika'),
      document.fonts.load('16px Caroni')
    ]);
  loadingText.destroy();

  // Also remove progress bar and box
  this.children.list.forEach(child => {
    if (child.type === 'Graphics') {
      child.destroy();
    }
  });

    // Once loading is complete, start MainScene
    this.scene.start('MainMenu');
  }
}
