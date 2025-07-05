class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
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

  preload() {

  }

  create() {
    this.buttonClickSound = window.GameState.soundStatus;

    this.initializeVariables();
    this.setupBackground();
    this.loadSoundEffects();
    this.headerSection();
    this.setUpBombAndRing();
    this.initializeKnife();
    this.createRingRotationPattern();
    this.initializeGameover();
    this.particleAnimation();
    this.manageEvents();
    this.startingParticleAnimation();
  }

  startingParticleAnimation() {
    const { width, height } = this.scale;

    const particles = this.add.particles("flares");
    this.emitter2 = this.add.particles("flares").createEmitter({
      frame: ["red", "yellow", "blue", "white", "green"],
      x: this.scale.width / 2,
      y: this.scale.height / 2.5,
      quantity: 11,
      frequency: 80,
      speed: { min: 180, max: 190 },
      angle: { min: 0, max: 360 },
      lifespan: 3000,
      alpha: { start: 1, end: 0 }, // 👈 required for fade
      scale: { start: 0.3, end: 1 },
      blendMode: "ADD",
      emitZone: {
        type: "random",
        source: new Phaser.Geom.Circle(0, 0, 2),
      },
    });

    const t =setTimeout(() => {
      this.emitter2.stop();
      clearTimeout(t);
    }, 1000);
  }
  manageEvents() {
    var that = this;

    this.scene.get("RewardAdScene").events.on("advertisment_over", (score) => {
      that.scene.stop("RewardAdScene"); // start main menu
      that.resetGame(that);
      window.GameState.rewardAdShows = false;
      console.log("Received score:", score);
    });
    this.scene.get("GameOverScene").events.on("remove_coins", (score) => {
      that.decreaseTokenValue(that);
      that.resetGame(that);
      window.GameState.coinGameroverButtonSHow = false;
    });

    this.scene.get("SettingScene").events.on("musicstatuschange", (status) => {
      console.log("musicstatuschange:", status);

      if (status) this.bgm.resume();
      else this.bgm.pause();
    });

    this.scene.get("SettingScene").events.on("soundstatuchange", (status) => {
      this.buttonClickSound = status;
      console.log("Sound status changed to:", status);
    });
    this.scene
      .get("GameOverScene")
      .events.on("cancel_background_music", (status) => {
        this.bgm.stop();
      });
  }

  setupBackground() {
    const bg = this.add.image(0, 0, "background").setOrigin(0);
    bg.setDisplaySize(this.scale.width, this.scale.height);
  }

  decreaseTokenValue(that) {
    let currentToken = this.getToken();

    console.log("Current token value:", currentToken);
    if (currentToken > 100) {
      currentToken -= 100;
      that.token = currentToken;
      localStorage.setItem("token", that.token);
      that.tokenAllText.setText(that.token);
    }
  }
  resetGame(that) {
    that.bombHitCount = 0;
    that.tokenHitCount = 0;
    that.token = that.getToken();
    that.try1.setVisible(false);
    that.tryfail1.setVisible(true);

    that.try2.setVisible(false);
    that.tryfail2.setVisible(true);

    that.try3.setVisible(false);
    that.tryfail3.setVisible(true);
  }

  initializeVariables() {
    this.bombHitCount = 0; // Track how many times the bomb has been hit
    this.tokenHitCount = 0; // Track how many times the token has been hit
    this.token = this.getToken(); // Initialize token

    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;
  }

  loadSoundEffects() {
    this.sound.add("button_click").play();
    this.bgm = this.sound.add("free_main1", {
      loop: true,
      volume: 0.5,
    });

    console.log("window.musisctatus", window.GameState.musisctatus);
    if (window.GameState.musisctatus) {
      this.bgm.play();
    }
    this.hitsound = this.sound.add("token");
    this.bombhitsound = this.sound.add("error");
    this.addStarSound = this.sound.add("add_star");
  }

  setUpBombAndRing() {
    this.bmbarray = [
      "target_normal1",
      "target_normal2",
      "target_normal3",
      "target_normal4",
      "target_normal5",
      "target_normal6",
      "target_normal7",
      "target_normal8",
    ];

    this.bmmbSelected =
      this.bmbarray[Math.floor(Math.random() * this.bmbarray.length)];
    this.bomb = this.physics.add.image(0, 0, "ui2", this.bmmbSelected);
    this.bomb.setImmovable(true);
    this.bomb.setDepth(1); // above background
    this.ringContainer = this.add.container(this.centerX, window.innerHeight * 0.38);
    this.ringIconsGroup = this.physics.add.group(); // for physics/collision
    this.ringContainer.add(this.bomb);
    this.ringIconsGroup.setDepth(1); // above background
    this.ringContainer.setScale(0.7); // above background

    if (window.innerWidth <= 600) {
      this.ringContainer.setScale(0.6); // above background
    }
    // Create rings
    const ring1 = [
      "eth",
      "dog",
      "ton",
      "usdc",
      "tet",
      "dog",
      "sol",
      "tet",
      "usdc",
      "dog",
    ];
    const ring2 = [
      "eth",
      "eth",
      "ton",
      "dog",
      "tet",
      "dog",
      "sol",
      "tet",
      "usdc",
      "dog",
    ];

    this.createRing(ring1, 150, 0);
    this.createRing(ring2, 200, 18);
  }

  particleAnimation() {
    // Create particle manager
    const particles = this.add.particles("particle");

    // Create emitter (disabled by default, we trigger manually)
    this.emitter = particles.createEmitter({
      x: 0,
      y: 0,
      speed: { min: 100, max: 300 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0 },
      lifespan: 800,
      gravityY: 200,
      quantity: 10,
      on: false, // disable auto emit
    });

    // Listen for mouse click and trigger explosion at that point
    // this.input.on('pointerdown', (pointer) => {
    //   const x = pointer.x;
    //   const y = pointer.y;

    //   this.emitter.setPosition(x, y);
    //   this.emitter.explode();
    // });
  }

  createRing(images, radius, angleOffset = 0) {
    const count = images.length;
    for (let i = 0; i < count; i++) {
      const angle = Phaser.Math.DegToRad((360 / count) * i + angleOffset);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const icon = this.add.image(x, y, "ui", images[i]);
      this.ringContainer.add(icon);
      // Add physics for collision
      this.physics.add.existing(icon);

      icon.body.setImmovable(true);
      this.ringIconsGroup.add(icon);
    }
  }

  initializeGameover() {
    const posY = window.innerHeight * 0.97;
    this.tryfail1 = this.add.image(
      this.cameras.main.centerX - 50,
      posY,
      "tryfail"
    );
    this.tryfail1.setScale(0.5);

    this.tryfail2 = this.add.image(this.cameras.main.centerX, posY, "tryfail");
    this.tryfail2.setScale(0.5);

    this.tryfail3 = this.add.image(
      this.cameras.main.centerX + 50,
      posY,
      "tryfail"
    );
    this.tryfail3.setScale(0.5);

    this.try1 = this.add
      .image(this.cameras.main.centerX - 50, posY, "ui", "try")
      .setVisible(false);
    this.try2 = this.add
      .image(this.cameras.main.centerX, posY, "ui", "try")
      .setVisible(false);
    this.try3 = this.add
      .image(this.cameras.main.centerX + 50, posY, "ui", "try")
      .setVisible(false);
  }

  initializeKnife() {
    this.knife = this.physics.add
      .image(
        this.cameras.main.centerX,
        window.innerHeight * 0.8,
        "ui",
        "knife_money1"
      )
      .setInteractive();

    this.knife.setScale(0.8);
    if (window.innerWidth <= 600) {
      this.knife.setScale(0.6);
    }
    this.knife.setDepth(1);
    this.knife.setVelocity(0); // Make sure it's not moving initially
    this.knife.setCollideWorldBounds(true); // Optional: stop it from going off-screen
this.knife.setInteractive({ useHandCursor: true });

    this.knife.on("pointerdown", (pointer) => {
      // Only spawn if not already moving
  if (this.knife.getBounds().contains(pointer.x, pointer.y)) {
    if (this.knife.body.velocity.y === 0) {
      this.knife.setVelocityY(-1500);
    }
  }
    });

    this.physics.add.overlap(
      this.knife,
      this.ringIconsGroup,
      this.handleHit,
      null,
      this
    );
    this.physics.add.overlap(this.knife, this.bomb, this.handleHit, null, this);
  }

  coinHitSplitAnimation(target) {
    const img1 = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "ui",
      target.frame.name + "1"
    );
    const img2 = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "ui",
      target.frame.name + "2"
    );

    img1.setDepth(1);
    img2.setDepth(1);

    const posY = this.cameras.main.height * 0.1;
    const posX = this.cameras.main.width * 0.7;

    img1.setScale(0.8);
    img2.setScale(0.8);
    this.tweens.add({
      targets: img1,
      x: posX,
      y: posY,
      duration: 1000,
      ease: "Sine.easeIn", // easing function

      onComplete: () => {
        this.emitter.setPosition(posX, posY);
        this.emitter.explode();
        this.manageSoundPlaying("addStarSound");
        img1.destroy();
      },
    });

    // Fall down
    this.tweens.add({
      targets: img2,
      x: this.cameras.main.centerX + 200,
      y: 1000, // adjust to your screen height
      duration: 1000,
      ease: "Sine.easeIn", // gravity-like
      onComplete: () => img2.destroy(),
    });

    // Horizontal sway
    this.tweens.add({
      targets: img2,
      x: this.cameras.main.centerX + 200,

      duration: 800,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    // Full rotation (continuous)
    this.tweens.add({
      targets: img2,
      angle: 360,
      duration: 1000,
      ease: "Linear",
      repeat: -1,
    });
  }

  knifeHitMovementAnimation(knife) {
    // Reset knife after hit
    this.knife.body.setVelocity(0, 0); // Stop movement
    this.knife.body.setAllowGravity(false); // Optional, disable gravity if any

    // Temporarily disable physics to fully reset position
    this.knife.body.reset(
      this.cameras.main.centerX,
      window.innerHeight * 0.8
    );

    // Re-enable gravity or any other physics
    this.knife.body.setAllowGravity(true); // Optional

    // Optionally set velocity again if needed
  }

  failedMbombHitXmarkImageUpdation() {
    this.manageSoundPlaying("bombhitsound");
    if (this.bombHitCount === 0) {
      this.try1.setVisible(true);
      this.tryfail1.setVisible(false);
    }
    if (this.bombHitCount === 1) {
      this.try2.setVisible(true);
      this.tryfail2.setVisible(false);
    }
    if (this.bombHitCount === 2) {
      this.try3.setVisible(true);
      this.tryfail3.setVisible(false);
      // this.scene.launch("Game");
      this.scene.launch("GameOverScene");
    }

    this.bombHitCount++;
  }

  manageSoundPlaying(type) {
    if (this.buttonClickSound == true) {
      if (type == "hitsound") {
        this.hitsound.play();
      }

      if (type == "bombhitsound") {
        this.bombhitsound.play();
      }

      if (type == "addStarSound") {
        this.addStarSound.play();
      }
    }
  }

  coinHitUserInterfaceAnimation(target) {
    this.manageSoundPlaying("hitsound");
    this.tokenHitCount++;
    this.token++;
    this.tokenHitCountText.setText(this.tokenHitCount);
    this.tokenAllText.setText(this.token);
    localStorage.setItem("token", this.token);
    target.destroy(); // remove ring icon
  }
  handleHit(knife, target) {
    if (target.texture.key === "ui") {
      this.coinHitSplitAnimation(target);
    }
    this.knifeHitMovementAnimation(knife);
    if (target.frame.name === this.bmmbSelected) {
      this.failedMbombHitXmarkImageUpdation();
    }
    if (target.frame.name !== this.bmmbSelected) {
      this.coinHitUserInterfaceAnimation(target);
    }

    target.setTint(0xff0000);
    this.time.delayedCall(100, () => {
      if (target && target.clearTint) target.clearTint();
    });
  }

  createRingRotationPattern() {
    const rotateForward = () => {
      this.tweens.add({
        targets: this.ringContainer,
        angle: "-=360",
        duration: 1200,
        ease: "easeInOutSine",
        onComplete: () => {
          rotateBack(); // Go back a little
        },
      });
    };

    const rotateBack = () => {
      this.tweens.timeline({
        targets: this.ringContainer,
        tweens: [
          {
            angle: "+=30",
            duration: 150,
            ease: "Quad.easeOut",
          },
          {
            angle: "+=50", // Total now +80
            duration: 150,
            ease: "Quad.easeOut",
          },
          {
            angle: "+=20", // Total now +100
            duration: 100,
            ease: "Quad.easeOut",
          },
          {
            angle: "-=10", // Small recoil back (resistance effect)
            duration: 120,
            ease: "Sine.easeInOut",
          },
          {
            angle: "+=10", // settle back to final +100
            duration: 80,
            ease: "Sine.easeOut",
          },
        ],
        onComplete: () => {
          rotateForward();
        },
      });
    };

    // Start the animation
    rotateForward();
  }

  update() {
    // console.log('Update called', this.bomb.angle);      // degrees
    // const angle = this.ringContainer.angle;
    // this.ringContainer.iterate(child => {
    //   child.angle = -angle;
    // });
    // console.log("window.musiscStatus", window.musisctatus);
    // console.log("window.soundStatus", window.soundStatus);
  }

  headerSection() {
    const { width, height } = this.cameras.main;
    console.log(this.cameras.main.width);
    const score = this.add.image(0, 0, "ui", "panel8");
    const score_icon = this.add.image(-10, 60, "ui", "score_icon");
    score_icon.setScale(1.5);
    this.tokenHitCountText = this.add.text(-60, -90, this.tokenHitCount, {
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
    // Step 3: Scale the whole container’s content to fit inside 300x100

    //Token Panel section
    const tokenpanel = this.add.image(0, 0, "ui", "panel3").setOrigin(0.5);
    const tokens_ico = this.add.image(-80, 0, "ui", "fruits6").setOrigin(0.5);

    const token = this.getToken();
    this.tokenAllText = this.add.text(-10, -30, this.token, {
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
    const settings = this.add.image(0, 0, "ui", "btn_options").setOrigin(0.5);
    const setingContainer = this.add.container(width * 0.95, 60, [settings]);
    setingContainer.setScale(0.5);

    settings.setInteractive();
    settings.on("pointerdown", () => {
      this.scene.launch("SettingScene");
    });
  }
}
