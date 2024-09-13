//export class CollisionManager {
//	private _characterColliders: Array<CharacterCollisionComponent> = new Array()
//	private _tileColliders: Array<TileCollisionComponent> = new Array()
//
//	public registerCharacterCollision(character: CharacterCollisionComponent): void {
//		this._characterColliders.push(character)
//	}
//
//	public registerTileCollision(tile: TileCollisionComponent): void {
//		this._tileColliders.push(tile)
//	}
//
//	public checkCollision(character: CharacterCollisionComponent, characterIndex: number): void {
//		for (let i = characterIndex + 1; i < this._characterColliders.length; i++) {
//			this.checkCharacterCollision(character, this._characterColliders[i])
//		}
//		this._tileColliders.forEach((otherTile) => {
//			this.checkCharacterCollision(character, otherTile)
//		})
//	}
//
//	private checkCharacterCollision(character: CharacterCollisionComponent, other: CollisionComponent): void {
//		const characterCollider = character.colliders[character.currentCollider]
//		const otherCollider = other.colliders[other.currentCollider]
//		if (characterCollider.collidesWith(otherCollider)) {
//			character.onCollision(other)
//			other.onCollision(character)
//		}
//	}
//
//	public update(): void {
//		// TODO: it may be worth it to sort arrays by min and max locations here, so that we can avoid unnecessary collision checks later
//		for (let characterIndex = 0; characterIndex < this._characterColliders.length; characterIndex++) {
//			this.checkCollision(this._characterColliders[characterIndex], characterIndex)
//		}
//	}
//}
