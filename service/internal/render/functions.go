package render

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image"
	"log"
	"net/http"
	"strings"

	"github.com/byvko-dev/am-core/helpers/requests"

	api "github.com/byvko-dev/am-types/api/generic/v1"

	stats "github.com/byvko-dev/am-types/api/stats/v1"
)

func GetStatsImage(payload stats.RequestPayload) (image.Image, error) {
	// Encode payload as base64 json
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error encoding payload: %v", err)
		return nil, err
	}
	encoded := base64.StdEncoding.EncodeToString(data)

	// Send request to render api
	var response api.ResponseWithError
	_, err = requests.Send(fmt.Sprintf("%v?d=%v", renderApiURL, encoded), http.MethodPost, nil, nil, &response)
	if err != nil {
		log.Printf("Error sending request to render api: %v", err)
		return nil, err
	}
	if response.Error.Message != "" {
		log.Printf("Error response from render api: %v", response.Error.Message)
		return nil, err
	}

	// Decode image to image.Image
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(response.Data.(string)))
	img, _, err := image.Decode(reader)
	if err != nil {
		log.Printf("Error decoding image: %v", err)
		return nil, err
	}

	return cropByAlphaPixels(img), nil
}
