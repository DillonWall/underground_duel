package utils

import "math"

type Vec2D[T int32 | float64] struct {
	X T
	Y T
}

func (v *Vec2D[T]) Multiply(scalar float64) *Vec2D[T] {
    x := float64(v.X) * scalar
    y := float64(v.Y) * scalar
    return &Vec2D[T]{T(math.Round(x)), T(math.Round(y))}
}

func (v *Vec2D[T]) Add(v2 *Vec2D[T]) *Vec2D[T] {
    return &Vec2D[T]{v.X + v2.X, v.Y + v2.Y}
}

func (v *Vec2D[T]) Round() *Vec2D[int32] {
    return &Vec2D[int32]{int32(math.Round(float64(v.X))), int32(math.Round(float64(v.Y)))}
}
