#Creation of the dynamoDB table - named "relocation_metrics"
resource "aws_dynamodb_table" "relocation_metrics" {
  name         = "relocation_metrics"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "region_metric"

  attribute {
    #primary key
    name = "region_metric"
    type = "S"
  }

  tags = {
    Project = "relo-ai-app"
    Env     = "dev"
  }
}
