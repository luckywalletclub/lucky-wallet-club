const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#222831',
  parent: 'game-container',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let score = 0;
let scoreText;
let clickButton;

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload() {
  this.load.image('coin', 'https://cdn.jsdelivr.net/gh/photonstorm/phaser3-examples/public/assets/sprites/coin.png');
}

function create() {
  score = 0;
  scoreText = this.add.text(game.scale.width / 2, 80, 'Score: 0', { fontSize: '32px', fill: '#FFD700' }).setOrigin(0.5);

  clickButton = this.add.sprite(game.scale.width / 2, game.scale.height / 2, 'coin').setInteractive();
  clickButton.setScale(2);

  clickButton.on('pointerdown', () => {
    score++;
    scoreText.setText('Score: ' + score);
    this.tweens.add({
      targets: clickButton,
      scale: 2.2,
      yoyo: true,
      duration: 80
    });
  });

  this.add.text(game.scale.width / 2, game.scale.height - 50, 'Lucky Wallet Clicker', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
}

function update() {
  // No continuous update needed for this simple game
} 