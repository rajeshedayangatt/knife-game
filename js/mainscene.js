class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  init() {

  }

  preload() {
   
  }

  resize() {
    const width = this.scale.width;
    const height = this.scale.height;
    console.log("Resizing to:", width, height);
    if (this.bg) {
      this.bg.setDisplaySize(width, height);
    }
  }


  create() {
    window.GameState.rewardAdShows = true;
    window.GameState.coinGameroverButtonSHow = true;
    this.scale.resize(window.innerWidth, window.innerHeight);

    this.bg = this.add
      .image(0, 0, "bg")
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.scale.on("resize", this.resize, this);

    this.createLogo();

    this.createPlayButton();

    this.headerSection();

    this.deviceType = getDeviceType(this);

    console.log("Device type:", this.deviceType);

    
    this.scene.get('SettingScene').events.on('musicstatuschange', (status) => {
      console.log("musicstatuschange:", status);
      window.GameState.musisctatus = status

    });

    this.scene.get('SettingScene').events.on('soundstatuchange', (status) => {
      console.log("musicstatuschange:", status);
      window.GameState.soundStatus = status

    });

  }

  createPlayButton() {
    const { centerX, width, height } = this.cameras.main;

    // Add the button image
    const playImage = this.add.image(0, 0, "ui", "btn_play2");

    // Responsive scaling (e.g. 40% of screen width)
    const originalBtnWidth = this.textures.get("ui").get("btn_play2").width;
    const targetBtnWidth = width * 0.4;
    const scale = targetBtnWidth / originalBtnWidth;
    playImage.setScale(scale);

    // Add the button text
    const playText = this.add
      .text(0, 0, "Play", {
        fontFamily: "troika",
        fontSize: `${Math.round(width * 0.06)}px`, // Dynamic font size based on screen width
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Create a container and center it
    this.playButtonContainer = this.add.container(centerX, window.innerHeight * 0.9, [
      playImage,
      playText,
    ]);

    // Make the image interactive
    playImage.setInteractive({ useHandCursor: true });

    playImage.on("pointerdown", () => {
      console.log("Play button clicked!");
      this.scene.start("Game"); // Replace with your target scene
    });

    playImage.on("pointerover", () => {
      this.input.manager.canvas.style.cursor = "pointer";
    });

    playImage.on("pointerout", () => {
      this.input.manager.canvas.style.cursor = "default";
    });
  }

  createLogo() {
    // Get the main camera (for screen size)
    const { centerX, centerY, width, height } = this.cameras.main;

    // Add the image centered
    this.logo = this.add.image(centerX, height * 0.5, "logo").setOrigin(0.5);

    // Get original image width
    const originalWidth = this.textures.get("logo").getSourceImage().width;

    // Define a desired screen percentage width (e.g., 30% of screen width)
    const targetWidth = width * 0.3;

    // Calculate scale factor to achieve that width
    const scale = targetWidth / originalWidth;
    this.logo.setScale(0.4);

    // Optional tween for pulsing effect (scale between 100% and 95%)
    this.tweens.add({
      targets: this.logo,
      scale: scale * 1.6,
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }
  getToken() {
    //crate token localstroage
    const token = localStorage.getItem("token");
    if (!token) {
      const newToken = 0;
      localStorage.setItem("token", newToken);
      return newToken;
    }
    return token;
  }
  scaleChildrenToFit(container, maxWidth, maxHeight) {
    // Get bounds of all children inside container
    const bounds = Phaser.Geom.Rectangle.Clone(container.getBounds());

    const contentWidth = bounds.width;
    const contentHeight = bounds.height;

    // Calculate scale needed to fit into target container
    const scaleX = maxWidth / contentWidth;
    const scaleY = maxHeight / contentHeight;
    const finalScale = Math.min(scaleX, scaleY); // maintain aspect ratio

    // Apply scale to container (children scale together)
    container.setScale(finalScale);
  }

  headerSectionMobile() {
    const { width, height } = this.cameras.main;
    console.log(this.cameras.main.width);
    const score = this.add.image(0, 0, "ui", "panel8");
    const score_icon = this.add.image(-10, 60, "ui", "score_icon");
    score_icon.setScale(1.5);
    const score_text = this.add.text(-60, -90, "18", {
      fontFamily: "troika",
      fontSize: "100px",
      color: "#A86233",
    });

    // Step 2: Create the container and add children
    const scoreContainer = this.add.container(width * 0.12, 60, [
      score,
      score_icon,
      score_text,
    ]);
    scoreContainer.setScale(0.35);
    // Step 3: Scale the whole container’s content to fit inside 300x100

    //shope panel section
    const shopepanel = this.add.image(0, 0, "ui", "panel3").setOrigin(0.5);
    const bag_arrows = this.add
      .image(-80, 0, "ui", "bag_arrows")
      .setOrigin(0.5);

    const shop_text = this.add.text(-40, -30, "SHOP", {
      fontFamily: "troika",
      fontSize: "42px",
      color: "#A86233",
    });

    const shopContainer = this.add.container(width * 0.4, 60, [
      shopepanel,
      bag_arrows,
      shop_text,
    ]);
    shopContainer.setScale(0.5);

    //Token Panel section
    const tokenpanel = this.add.image(0, 0, "ui", "panel3").setOrigin(0.5);
    const tokens_ico = this.add.image(-80, 0, "ui", "fruits6").setOrigin(0.5);

    const token = this.getToken();
    const token_text = this.add.text(-10, -30, token, {
      fontFamily: "troika",
      fontSize: "42px",
      color: "#A86233",
    });

    const tokenContainer = this.add.container(width * 0.72, 60, [
      tokenpanel,
      tokens_ico,
      token_text,
    ]);
    tokenContainer.setScale(0.5);

    // setting section
    const settings = this.add.image(0, 0, "ui", "btn_options").setOrigin(0.5);
    const setingContainer = this.add.container(width * 0.95, 60, [settings]);
    setingContainer.setScale(0.5);
  }

  headerSectionDesktop() {
    const { width, height } = this.cameras.main;
    console.log(this.cameras.main.width);
    const score = this.add.image(0, 0, "ui", "panel8");
    const score_icon = this.add.image(-10, 60, "ui", "score_icon");
    score_icon.setScale(1.5);
    this.tokenHitCountText = this.add.text(-60, -90, "18", {
      fontFamily: "troika",
      fontSize: "100px",
      color: "#A86233",
    });

    // Step 2: Create the container and add children
    const scoreContainer = this.add.container(width * 0.12, 60, [
      score,
      score_icon,
      this.tokenHitCountText,
    ]);
    scoreContainer.setScale(0.35);

    //shope panel section
    const shopepanel = this.add.image(0, 0, "ui", "panel3")
      .setOrigin(0.5);
    const bag_arrows = this.add
      .image(-80, 0, "ui", "bag_arrows")
      .setOrigin(0.5);
    const shope_text = this.add.text(-25, -25, "SHOP", {
      fontFamily: "troika",
      fontSize: "42px",
      color: "#A86233",
    });


      
    const shopeContainer = this.add.container(width * 0.40, 60, [
      shopepanel,
      bag_arrows,
      shope_text,
    ]);
    shopeContainer.setScale(0.5);

    //Token Panel section
    const tokenpanel = this.add.image(0, 0, "ui", "panel3").setOrigin(0.5);
    const tokens_ico = this.add.image(-80, 0, "ui", "fruits6").setOrigin(0.5);

    const token = this.getToken();
    this.tokenAllText = this.add.text(-10, -25, token, {
      fontFamily: "troika",
      fontSize: "42px",
      color: "#A86233",
    });

  
    const tokenContainer = this.add.container(width * 0.72, 60, [
      tokenpanel,
      tokens_ico,
      this.tokenAllText,
    ]);
    tokenContainer.setScale(0.5);

    // setting section
    // setting section
    const settings = this.add.image(0, 0, "ui", "btn_options").setOrigin(0.5);
    const setingContainer = this.add.container(width * 0.95, 60, [settings]);
    setingContainer.setScale(0.5);

    settings.setInteractive();
    settings.on("pointerdown", () => {
      this.scene.launch("SettingScene");
    });

  }
  headerSection() {
    const deviceType = getDeviceType(this);

    console.log("Device type:", deviceType);
    // if( deviceType === "mobile" || deviceType=== "tablet" ){
    //   this.headerSectionMobile();
    // }else{
    //   this.headerSectionDesktop();
    // }

    this.headerSectionDesktop();

    //score sections
  }
}
