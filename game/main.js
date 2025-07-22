class WheelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WheelScene' });
    this.isSpinning = false;
    this.prizes = [
      '50 Coins', 'Try Again', '100 Coins', 'No Prize', '200 Coins', 'Bonus Spin'
    ];
  }

  preload() {
    this.load.image('pointer', 'https://cdn.jsdelivr.net/gh/photonstorm/phaser3-examples/public/assets/sprites/longarrow.png');
    this.load.audio('spin', 'assets/spin.wav');
    this.load.audio('win', 'assets/win.wav');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const radius = Math.min(this.scale.width, this.scale.height) / 3;
    const colors = [0xffe066, 0xf38181, 0x95e1d3, 0xfce38a, 0xeaafc8, 0x62d2a2];

    // Çark için container
    this.wheelContainer = this.add.container(centerX, centerY);

    // Dilimleri ve yazıları birlikte ekle
    for (let i = 0; i < 6; i++) {
      // Dilim
      const graphics = this.add.graphics();
      graphics.fillStyle(colors[i], 1);
      graphics.slice(0, 0, radius, Phaser.Math.DegToRad(i * 60), Phaser.Math.DegToRad((i + 1) * 60), false);
      graphics.fillPath();

      // Yazı
      const angle = Phaser.Math.DegToRad(i * 60 + 30);
      const textX = Math.cos(angle) * (radius * 0.65);
      const textY = Math.sin(angle) * (radius * 0.65);
      const label = this.add.text(textX, textY, this.prizes[i], {
        fontSize: '16px',
        color: '#222',
        fontStyle: 'bold'
      }).setOrigin(0.5).setAngle(i * 60 + 30);

      this.wheelContainer.add(graphics);
      this.wheelContainer.add(label);
    }

    // Pointer (ok)
    this.pointer = this.add.image(centerX, centerY - radius - 30, 'pointer').setScale(0.2).setAngle(180);

    // Spin butonu
    this.spinButton = this.add.text(centerX, centerY + radius + 60, 'SPIN!', {
      fontSize: '32px',
      backgroundColor: '#FFD700',
      color: '#222',
      padding: { x: 30, y: 10 },
      borderRadius: 10
    }).setOrigin(0.5).setInteractive();

    this.spinButton.on('pointerdown', () => this.spinWheel());

    // Sonuç metni
    this.resultText = this.add.text(centerX, centerY + radius + 120, '', {
      fontSize: '24px',
      color: '#fff'
    }).setOrigin(0.5);

    // Sesler
    this.spinSound = this.sound.add('spin');
    this.winSound = this.sound.add('win');

    this.scale.on('resize', this.resize, this);
  }

  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.resultText.setText('');

    const prizeIndex = Phaser.Math.Between(0, 5);
    const rounds = Phaser.Math.Between(3, 5);
    const finalAngle = 360 * rounds + (prizeIndex * 60) + 30;

    // Spin sesi başlat ve referansını tut
    const spinSoundInstance = this.spinSound.play();

    // 3 saniye sonra spin sesini durdur
    this.time.delayedCall(3000, () => {
      this.spinSound.stop();
    });

    this.tweens.add({
      targets: this.wheelContainer,
      angle: finalAngle,
      duration: 3000,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        this.isSpinning = false;
        this.resultText.setText('You won: ' + this.prizes[prizeIndex]);
        // Kazanma sesi
        this.winSound.play();
      }
    });
  }

  resize(gameSize) {
    this.scene.restart();
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#222831',
  parent: 'game-container',
  scene: [WheelScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
}); 