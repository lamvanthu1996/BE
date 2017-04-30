class ShipType2Controller extends ShipController{
  constructor(position,configs){
    super(position.x, position.y, ShipType2Controller.SPRITE_NAME,configs);
    this.health = ShipType2Controller.MAX_HEALTH;
    this.cooldown = ShipType2Controller.COOL_DOWN;
  }
  createBullet(direction){
    new BulletType2Controller(
      this.sprite.position,
      direction
    )
  }
}
ShipType2Controller.SPRITE_NAME = "Spaceship2-Player.png";
ShipType2Controller.MAX_HEALTH = 100;
ShipType2Controller.COOL_DOWN = 500;
