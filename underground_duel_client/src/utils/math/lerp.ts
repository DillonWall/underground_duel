export const lerp = (start: number, end: number, t: number): number => {
	return start * (1.0 - t) + end * t
}
