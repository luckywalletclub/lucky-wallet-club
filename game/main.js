// Görsel placeholder için assets/wallet.png kullanılacak
const SCENES = {
  HOME: 'HomeScene',
  MARKET: 'MarketScene',
  BAG: 'BagScene',
  TASKS: 'TasksScene',
  LEADERBOARD: 'LeaderboardScene',
};

class HomeScene extends Phaser.Scene {
  constructor() {
    super(SCENES.HOME);
    this.dailyLimit = 500;
    this.walletPoints = 0;
    this.clicksToday = 0;
  }

  preload() {
    this.load.image('wallet', 'assets/wallet.png');
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#181c24');

    // Başlık
    this.add.text(width / 2, 60, 'Lucky Wallet Club', {
      fontFamily: 'Poppins', fontSize: '32px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Cüzdan görseli
    this.walletImg = this.add.image(width / 2, height / 2 - 40, 'wallet').setDisplaySize(120, 80).setInteractive();

    // Click butonu
    this.clickBtn = this.add.text(width / 2, height / 2 + 70, 'CLICK!', {
      fontFamily: 'Poppins', fontSize: '28px', backgroundColor: '#6c47ff', color: '#fff', padding: { x: 32, y: 12 }, borderRadius: 24
    }).setOrigin(0.5).setInteractive();

    // Puan ve kalan click
    this.pointsText = this.add.text(width / 2, height / 2 + 130, `Points: ${this.walletPoints}`, {
      fontFamily: 'Poppins', fontSize: '22px', color: '#FFD700'
    }).setOrigin(0.5);
    this.limitText = this.add.text(width / 2, height / 2 + 170, `Clicks left: ${this.dailyLimit - this.clicksToday}`, {
      fontFamily: 'Poppins', fontSize: '18px', color: '#fff'
    }).setOrigin(0.5);

    // Menü butonları
    this.createNavButton(width / 2 - 120, height - 60, 'Market', SCENES.MARKET);
    this.createNavButton(width / 2, height - 60, 'Bag', SCENES.BAG);
    this.createNavButton(width / 2 + 120, height - 60, 'Tasks', SCENES.TASKS);
    this.createNavButton(width - 80, 40, 'Leaderboard', SCENES.LEADERBOARD, 0.7);

    // Click event
    this.walletImg.on('pointerdown', () => this.handleClick());
    this.clickBtn.on('pointerdown', () => this.handleClick());
  }

  handleClick() {
    if (this.clicksToday < this.dailyLimit) {
      this.walletPoints++;
      this.clicksToday++;
      this.pointsText.setText(`Points: ${this.walletPoints}`);
      this.limitText.setText(`Clicks left: ${this.dailyLimit - this.clicksToday}`);
      // Basit animasyon
      this.tweens.add({ targets: this.walletImg, scale: 1.1, yoyo: true, duration: 80 });
    }
  }

  createNavButton(x, y, label, targetScene, scale = 1) {
    const btn = this.add.text(x, y, label, {
      fontFamily: 'Poppins', fontSize: '20px', backgroundColor: '#fff', color: '#6c47ff', padding: { x: 24, y: 10 }, borderRadius: 20
    }).setOrigin(0.5).setInteractive().setScale(scale);
    btn.on('pointerdown', () => this.scene.start(targetScene, { from: SCENES.HOME, walletPoints: this.walletPoints, clicksToday: this.clicksToday }));
  }
}

function createBackButton(scene, x, y, fromScene, extra = {}) {
  const btn = scene.add.text(x, y, '< Back', {
    fontFamily: 'Poppins', fontSize: '18px', backgroundColor: '#fff', color: '#6c47ff', padding: { x: 18, y: 8 }, borderRadius: 16
  }).setOrigin(0, 0.5).setInteractive();
  btn.on('pointerdown', () => scene.scene.start(fromScene, extra));
}

class MarketScene extends Phaser.Scene {
  constructor() { super(SCENES.MARKET); }
  create(data) {
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#181c24');
    this.add.text(width / 2, 60, 'Market', { fontFamily: 'Poppins', fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.add.text(width / 2, 200, 'Market screen (coming soon)', { fontFamily: 'Poppins', fontSize: '20px', color: '#FFD700' }).setOrigin(0.5);
    createBackButton(this, 40, 40, SCENES.HOME, data);
  }
}

class BagScene extends Phaser.Scene {
  constructor() { super(SCENES.BAG); }
  create(data) {
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#181c24');
    this.add.text(width / 2, 60, 'Bag', { fontFamily: 'Poppins', fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.add.text(width / 2, 200, 'Bag screen (coming soon)', { fontFamily: 'Poppins', fontSize: '20px', color: '#FFD700' }).setOrigin(0.5);
    createBackButton(this, 40, 40, SCENES.HOME, data);
  }
}

class TasksScene extends Phaser.Scene {
  constructor() { super(SCENES.TASKS); }
  create(data) {
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#181c24');
    this.add.text(width / 2, 60, 'Tasks', { fontFamily: 'Poppins', fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.add.text(width / 2, 200, 'Tasks screen (coming soon)', { fontFamily: 'Poppins', fontSize: '20px', color: '#FFD700' }).setOrigin(0.5);
    createBackButton(this, 40, 40, SCENES.HOME, data);
  }
}

class LeaderboardScene extends Phaser.Scene {
  constructor() { super(SCENES.LEADERBOARD); }
  create(data) {
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#181c24');
    this.add.text(width / 2, 60, 'Leaderboard', { fontFamily: 'Poppins', fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.add.text(width / 2, 200, 'Leaderboard screen (coming soon)', { fontFamily: 'Poppins', fontSize: '20px', color: '#FFD700' }).setOrigin(0.5);
    createBackButton(this, 40, 40, SCENES.HOME, data);
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#181c24',
  parent: 'game-container',
  scene: [HomeScene, MarketScene, BagScene, TasksScene, LeaderboardScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
}); 