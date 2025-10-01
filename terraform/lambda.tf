// === Ping Lambda ===
data "archive_file" "ping_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/ping"
  output_path = "${path.module}/../dist/ping.zip"
}

resource "aws_lambda_function" "ping" {
  function_name    = "relo-ai-app-ping"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.default"
  filename         = data.archive_file.ping_zip.output_path
  source_code_hash = data.archive_file.ping_zip.output_base64sha256
  timeout          = 30

  environment {
    variables = {
      APP_NAME = "relo-ai-app"
    }
  }

  tags = {
    Project = "relo-ai-app"
    Env     = "dev"
  }
}

// === Cost of Living Lambda ===
data "archive_file" "col_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/cost_of_living"
  output_path = "${path.module}/../dist/cost_of_living.zip"
}

resource "aws_lambda_function" "cost_of_living" {
  function_name    = "relo-ai-app-cost-of-living"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.default"
  filename         = data.archive_file.col_zip.output_path
  source_code_hash = data.archive_file.col_zip.output_base64sha256
  timeout          = 30

  environment {
    variables = {
      ZYLA_KEY = "zyla_api_key"
      ZYLA_URL = "zyla_api_url"
      CACHE_TABLE = aws_dynamodb_table.cost_of_living_cache.name
    }
  }
}

// === Salary Lambda ===
data "archive_file" "salary_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/salary"
  output_path = "${path.module}/../dist/salary.zip"
}

resource "aws_lambda_function" "salary" {
  function_name    = "relo-ai-app-salary"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.default"
  timeout          = 30
  filename         = data.archive_file.salary_zip.output_path
  source_code_hash = data.archive_file.salary_zip.output_base64sha256

  environment {
    variables = {
      OPENWEBNINJA_KEY = "openwebninja_api_key"
      OPENWEBNINJA_URL = "openwebninja_api_url"
      CACHE_TABLE = aws_dynamodb_table.job_salaries.name
    }
  }
}

// === Metrics Lambda ===
data "archive_file" "metrics_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/metrics"
  output_path = "${path.module}/../dist/metrics.zip"
}

resource "aws_lambda_function" "metrics" {
  function_name    = "relo-ai-app-metrics"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.default"
  filename         = data.archive_file.metrics_zip.output_path
  source_code_hash = data.archive_file.metrics_zip.output_base64sha256
  timeout          = 30

  environment {
    variables = {
      CACHE_TABLE = aws_dynamodb_table.relo_ai_app_cache.name
    }
  }
}

// === Auth Lambda ===
data "archive_file" "auth_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/shared/auth"
  output_path = "${path.module}/../dist/auth.zip"
}

resource "aws_lambda_function" "auth" {
  function_name    = "relo-ai-app-auth"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.auth"
  filename         = data.archive_file.auth_zip.output_path
  source_code_hash = data.archive_file.auth_zip.output_base64sha256
  timeout          = 30
}
