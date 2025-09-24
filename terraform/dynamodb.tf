# === Relocation Metrics Table ===
resource "aws_dynamodb_table" "relocation_metrics" {
  name         = "relocation_metrics"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "city" //partition key 
  range_key = "metric" //sort key

  attribute {
    name = "city"
    type = "S"
  }

  attribute {
    name = "metric"
    type = "S"
  }

  tags = {
    Project = "relo-ai-app"
    Env     = "dev"
  }
}

# === Job Salaries Table ===
resource "aws_dynamodb_table" "job_salaries" {
  name         = "job_salaries"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "job" //partition key
  range_key = "city" //sort key

  attribute {
    name = "job"
    type = "S"
  }

  attribute {
    name = "city"
    type = "S"
  }

  tags = {
    Project = "relo-ai-app"
    Env     = "dev"
  }
}

