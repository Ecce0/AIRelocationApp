variable "region" {
  default = "us-east-1"
}

variable "zyla_api_key" {
  type        = string
  sensitive   = true
}

variable "zyla_api_url" {
  type        = string
}

variable "openwebninja_api_key" {
  type        = string
  sensitive   = true
}

variable "openwebninja_api_url" {
  type        = string
}
