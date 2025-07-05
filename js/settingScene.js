// In your GameOverScene
class SettingScene extends Phaser.Scene {
  constructor() {
    super({ key: "SettingScene" });

    this.count = 1;
  }

  init() {
    //  Inject our CSS
    var element = document.createElement("style");

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles =
      '@font-face { font-family: "troika"; src: url("assets/gogono-cocoa-mochi-cyrillic.otf") format("opentype"); }\n';

    sheet.insertRule(styles, 0);

    styles =
      '@font-face { font-family: "Caroni"; src: url("assets/KardinalPro-ExtraBold.ttf") format("truetype"); }';

    sheet.insertRule(styles, 0);
  }

  preload() {
    // this.load.atlas(
    //   "ui",
    //   origin + "/assets/common1.png",
    //   origin + "/assets/common1.json"
    // );

   // this.load.audio("button_click", "assets/button_click.mp3");    

  }

  create() {
    const { width, height } = this.cameras.main;
    this.centerX = this.cameras.main.centerX;
    this.centerY = window.innerHeight / 2;

    this.count = 1;
    const rect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9);
    rect.setInteractive();



    const musicon = this.add
      .image(
        this.centerX - window.innerWidth / 3,
        this.centerY,
        "ui",
        "btn_music_on"
      )
      .setOrigin(0.5)
      .setInteractive();
    const musicoff = this.add
      .image(
        this.centerX - window.innerWidth / 3,
        this.centerY,
        "ui",
        "btn_music_off"
      )
      .setOrigin(0.5)
      .setInteractive();
    const btn_sound_off = this.add
      .image(this.centerX, this.centerY, "ui", "btn_sound_off")
      .setOrigin(0.5)
      .setInteractive();
    const btn_sound_on = this.add
      .image(this.centerX, this.centerY, "ui", "btn_sound_on")
      .setOrigin(0.5)
      .setInteractive();

    const btn_lang = this.add
      .image(
        this.centerX + window.innerWidth / 3,
        this.centerY,
        "ui",
        "btn_lang"
      )
      .setOrigin(0.5)
      .setInteractive();

    musicon.setInteractive();
    musicoff.setInteractive();
    btn_sound_off.setInteractive();
    btn_sound_on.setInteractive();
    btn_lang.setInteractive();


    musicon.setVisible(window.GameState.musisctatus);
    musicoff.setVisible(!window.GameState.musisctatus);
    btn_sound_off.setVisible(!window.GameState.soundStatus);
    btn_sound_on.setVisible(window.GameState.soundStatus);

    musicon.on("pointerdown", () => {
      this.sound.add("button_click").play();

      musicon.setVisible(false);
      musicoff.setVisible(true);
      window.GameState.musiscStatus = false;
      
      this.events.emit('musicstatuschange', false);

      console.log("musicon", window.GameState.musiscStatus);
    });

    musicoff.on("pointerdown", () => {
      this.sound.add("button_click").play();
      musicon.setVisible(true);
      musicoff.setVisible(false);
      window.GameState.musiscStatus = true;
      this.events.emit('musicstatuschange', true);
      console.log("musicoff", window.GameState.musiscStatus);

    });

    btn_sound_on.on("pointerdown", () => {
      this.sound.add("button_click").play();
      btn_sound_on.setVisible(false);
      btn_sound_off.setVisible(true);
      window.GameState.soundStatus = false;
      this.events.emit('soundstatuchange', false);

    });

    btn_sound_off.on("pointerdown", () => {
      this.sound.add("button_click").play();

      btn_sound_on.setVisible(true);
      btn_sound_off.setVisible(false);
      window.GameState.soundStatus = true;
      this.events.emit('soundstatuchange', true);

    });

    rect.on("pointerdown", () => {
        if(window.GameState.soundStatus){
                  this.sound.add("button_click").play();

        }
      this.scene.stop("SettingScene");
    });
  }

  update() {
    // console.log('Update called!',this.count);
    // this.bomb_text_count.setText(this.count);
    // this.count += 1; // Increment the count each time update is called
  }
}
