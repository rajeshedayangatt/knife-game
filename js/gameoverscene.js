// In your GameOverScene
class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });

    this.count = 0
  }



     init ()
  {
      //  Inject our CSS
      // var element = document.createElement('style');

      // document.head.appendChild(element);

      // var sheet = element.sheet;

      // var styles = '@font-face { font-family: "troika"; src: url("assets/gogono-cocoa-mochi-cyrillic.otf") format("opentype"); }\n';

      // sheet.insertRule(styles, 0);

      // styles = '@font-face { font-family: "Caroni"; src: url("assets/KardinalPro-ExtraBold.ttf") format("truetype"); }';

      // sheet.insertRule(styles, 0);
  }

  preload() {
    // this.load.atlas('ui', 'assets/common1.png', 'assets/common1.json');
    // this.load.atlas('ui2', 'assets/common2.png', 'assets/common2.json');
  }

  create() {

  this.cameras.main.setScroll(0, this.scale.height);

  this.tweens.add({
    targets: this.cameras.main,
    scrollY: 0,
    duration: 200,
    ease: 'Sine.easeOut',
  });



    const { width, height } = this.cameras.main;
   this.centerX = this.cameras.main.centerX;
    this.centerY = window.innerHeight / 2;


    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9);



    const bomb = this.add.image(this.centerX,this.centerY - 150,'ui2', 'target_normal1').setOrigin(0.5);
    bomb.setScale(0.8);

    const bomb_text = this.add.text(this.centerX,this.centerY - 170, 'CONTINUE', {
      fontFamily: 'troika',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#A86233',
       strokeThickness: 12,   
    }).setOrigin(0.5);
    bomb_text.setScale(0.4);

    this.bomb_text_count = this.add.text(this.centerX,this.centerY - 120, this.count, {
      fontFamily: 'troika',
      fontSize: '48px',
      color: '#A86233',
            stroke: '#ffffff',
       strokeThickness: 5,   
    }).setOrigin(0.5);






    const watch = this.add.image(this.centerX,this.centerY,'ui', 'btn_play2').setOrigin(0.5).setInteractive();
    watch.setInteractive({ useHandCursor: true });
    const watch_text = this.add.text(this.centerX + 20,this.centerY - 5, 'Watch', {
      fontFamily: 'troika',
      fontSize: '38px',
      color: '#ffffff',
        stroke: '#A86233',
       strokeThickness: 5, 
    }).setOrigin(0.5);
    watch.setScale(0.8);
    watch_text.setScale(0.8);
    const watch_icon = this.add.image(this.centerX - 50 ,this.centerY - 5,'ui', 'rewarded_ad2').setOrigin(0.5).setInteractive();
    watch_icon.setScale(0.8);

    watch.setVisible( window.GameState.rewardAdShows);
    watch_text.setVisible( window.GameState.rewardAdShows);
    watch_icon.setVisible( window.GameState.rewardAdShows);


    const coin = this.add.image(this.centerX,this.centerY + 80,'ui', 'btn_play2').setOrigin(0.5).setInteractive();
    coin.setInteractive({ useHandCursor: true });
    const coin_text = this.add.text(this.centerX + 10,this.centerY + 75, '100', {
      fontFamily: 'troika',
      fontSize: '38px',
      color: '#ffffff',
        stroke: '#A86233',
       strokeThickness: 5, 
    }).setOrigin(0.5);
    coin.setScale(0.8);
    coin_text.setScale(0.8);
    const coin_icon = this.add.image(this.centerX - 50,this.centerY + 78,'ui', 'tokens_ico').setOrigin(0.5).setInteractive();
    coin_icon.setScale(0.5);

    
    coin.setVisible( window.GameState.coinGameroverButtonSHow);
    coin_text.setVisible( window.GameState.coinGameroverButtonSHow);
    coin_icon.setVisible( window.GameState.coinGameroverButtonSHow);


    this.cancel = this.add.image(this.centerX,this.centerY + 160,'ui', 'btn_red').setOrigin(0.5).setInteractive();
    this.cancel.setInteractive({ useHandCursor: true });
    const cancel_text = this.add.text(this.centerX,this.centerY + 155, 'Cancel', {
      fontFamily: 'troika',
      fontSize: '38px',
      color: '#ffffff',
      stroke: '#A86233',
       strokeThickness: 5,   
    }).setOrigin(0.5);
    this.cancel.setScale(0.7);
    cancel_text.setScale(0.7);
    


    // this.cancel = this.add.image(this.centerX,this.centerY + 160,'ui', 'btn_red').setOrigin(0.5).setInteractive();
    // this.cancel.setInteractive({ useHandCursor: true });
    //    this.cancel.setDepth(1); // above background
    // this.cancel.setScale(0.7);

    this.cancel.on('pointerdown', () => {

      
      this.scene.start('MainMenu'); // start main menu
      this.scene.stop('Game');    
      this.scene.stop('GameOverScene'); 
      window.GameState.rewardAdShows = true ;
      this.events.emit('cancel_background_music', 100);

    });

    watch.on('pointerdown', () => {

      
      this.scene.stop('GameOverScene'); 
      this.scene.start('RewardAdScene'); // start main menu

    });

    coin.on('pointerdown', () => {

      console.log("coinc lcik")
      this.scene.stop('GameOverScene'); 
      this.events.emit('remove_coins', 100);
      coin.setVisible( window.GameState.coinGameroverButtonSHow);
      coin.setVisible( window.GameState.coinGameroverButtonSHow);
      coin.setVisible( window.GameState.coinGameroverButtonSHow);
    });
    
    
    this.scene.get('RewardAdScene').events.on('advertisment_over', (score) => {
     console.log('Received score:', score);
      watch.setVisible(false);
      watch_text.setVisible(false);
      watch_icon.setVisible( false);
    });



    const interval = setInterval(() => {
      // Safety: only update if still in a valid scene
      if (!this.scene.isActive()) {
        clearInterval(interval);
        return;
      }

      if (this.bomb_text_count && this.bomb_text_count.setText) {
        this.bomb_text_count.setText(this.count);
      }

      this.count += 1;

      if (this.count === 11) {
        clearInterval(interval);
        location.reload(); // ⚠️ Consider using scene.restart() or scene.start() instead of full reload
      }
    }, 1000);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      clearInterval(interval);
    });
  }

  update() {


   // console.log('Update called!',this.count);
   // this.bomb_text_count.setText(this.count);

   // this.count += 1; // Increment the count each time update is called
    }
}
