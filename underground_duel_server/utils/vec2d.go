package utils

import "math"

type Vec2D struct {
	X int32
	Y int32
}

func (v *Vec2D) Multiply(scalar float64) *Vec2D {
    x := float64(v.X) * scalar
    y := float64(v.Y) * scalar
    return &Vec2D{int32(math.Round(x)), int32(math.Round(y))}
}

func (v *Vec2D) Add(v2 *Vec2D) *Vec2D {
    return &Vec2D{v.X + v2.X, v.Y + v2.Y}
}
