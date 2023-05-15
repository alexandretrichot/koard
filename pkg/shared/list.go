package shared

type List[T any] struct {
	Items []T `json:"items"`
	Total int `json:"total"`
	Limit int `json:"limit"`
	Skip  int `json:"skip"`
}
