class ShipType1Controller extends ShipController{
  constructor(position,configs){
    super(position.x, position.y, ShipType1Controller.SPRITE_NAME,configs);
    this.health = ShipType1Controller.MAX_HEALTH;
    this.cooldown = ShipType1Controller.COOL_DOWN;
  }
  createBullet(direction){
    new BulletType1Controller(
      this.sprite.position,
      direction
    )
  }
}
ShipType1Controller.SPRITE_NAME = "Spaceship1-Player.png";
ShipType1Controller.MAX_HEALTH = 30;
ShipType1Controller.COOL_DOWN = 500;
