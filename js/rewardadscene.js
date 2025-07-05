// In your GameOverScene
class RewardAdScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RewardAdScene' });

    this.count = 1
  }



     init ()
  {
      //  Inject our CSS
      var element = document.createElement('style');

      document.head.appendChild(element);

      var sheet = element.sheet;

      var styles = '@font-face { font-family: "troika"; src: url("assets/gogono-cocoa-mochi-cyrillic.otf") format("opentype"); }\n';

      sheet.insertRule(styles, 0);

      styles = '@font-face { font-family: "Caroni"; src: url("assets/KardinalPro-ExtraBold.ttf") format("truetype"); }';

      sheet.insertRule(styles, 0);
  }

  preload() {

  }

  create() {
    const { width, height } = this.cameras.main;
    this.centerX = this.cameras.main.centerX;
    this.centerY = window.innerHeight / 2;

    this.count = 1
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9);

    this.timeraddcall = this.add.text(this.centerX,this.centerY - 50, '0', {
      fontFamily: 'troika',
      fontSize: '80px',
      color: '#ffffff',
    //   stroke: '#A86233',
    strokeThickness: 1,   
    }).setOrigin(0.5);


    const cancel_text = this.add.text(this.centerX,this.centerY + 50, 'REWARDED AD CALL', {
      fontFamily: 'troika',
      fontSize: '32px',
      color: '#ffffff',
    //   stroke: '#A86233',
       strokeThickness: 1,   
    }).setOrigin(0.5);
    

    const interval = setInterval(() => {
      this.timeraddcall.setText(this.count);
      this.count += 1; // Increment the count each time update is called

      if(this.count == 6){
          
        this.events.emit('advertisment_over', 100);
        clearInterval(interval);
        }
    }, 1000);

  }

  update() {



   // console.log('Update called!',this.count);
   // this.bomb_text_count.setText(this.count);

   // this.count += 1; // Increment the count each time update is called
    }
}
