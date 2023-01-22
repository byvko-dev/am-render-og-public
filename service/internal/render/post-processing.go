package render

import "image"

type subImg interface {
	SubImage(r image.Rectangle) image.Image
}

func cropByAlphaPixels(img image.Image) image.Image {
	// Find the first alpha 0 pixel on x and y
	var crop image.Rectangle = image.Rect(0, 0, img.Bounds().Max.X, img.Bounds().Max.Y)
	for y := 0; y < img.Bounds().Max.Y; y++ {
		_, _, _, a := img.At(0, y).RGBA()
		if a == 0 {
			crop.Max.Y = y
			break
		}
	}
	for x := 0; x < img.Bounds().Max.X; x++ {
		_, _, _, a := img.At(x, 0).RGBA()
		if a == 0 {
			crop.Max.X = x
			break
		}
	}

	// Crop the image
	imgCropped := img.(subImg)
	return imgCropped.SubImage(crop)
}
