<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
        <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>
    

<script type="text/javascript">

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 800,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

        var game = new Phaser.Game(config);


        function preload ()
    {

        this.load.atlas('ui', 'assets/common1.png', 'assets/common1.json');

    }

      function create ()
    {

            this.add.image(500, 300, 'ui', 'btn_red');
            this.add.image(500, 380, 'ui', 'knife_ad1');

            

    }

     function update ()
    {

    }


    </script>
</body>
</html>