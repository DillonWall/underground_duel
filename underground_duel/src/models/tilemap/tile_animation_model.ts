export default class TileAnimationModel {
	constructor(
		public name: string,
		public imageSrc: string,
		public delays: number[],
		public loop: boolean,
		public resetOnAwake: boolean,
		public frameImageIndecies: number[]
	) {}
}
