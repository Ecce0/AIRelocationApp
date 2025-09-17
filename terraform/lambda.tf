# Zip the Lambda code from Backend/ automatically
data "archive_file" "ping_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../Backend/ping" 
  output_path = "${path.module}/build/ping.zip"
}


resource "aws_lambda_function" "ping" {
  function_name = "relo-ai-app-ping"
  role          = aws_iam_role.lambda_role_auth.arn

  runtime = "nodejs22.x"  
  handler = "index.handler" 

  filename         = data.archive_file.ping_zip.output_path
  source_code_hash = data.archive_file.ping_zip.output_base64sha256

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


# COL Lambda
data "archive_file" "col_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../Backend/cost_of_living"
  output_path = "${path.module}/build/cost_of_living.zip"
}
resource "aws_lambda_function" "cost_of_living" {
  function_name    = "relo-ai-app-cost-of-living"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.costOfLiving"        
  filename         = data.archive_file.col_zip.output_path
  source_code_hash = data.archive_file.col_zip.output_base64sha256
}

# Salary Lambda
data "archive_file" "salary_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../Backend/salary"
  output_path = "${path.module}/build/salary.zip"
}
resource "aws_lambda_function" "salary" {
  function_name    = "relo-ai-app-salary"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.salary"
  filename         = data.archive_file.salary_zip.output_path
  source_code_hash = data.archive_file.salary_zip.output_base64sha256
}

# Metrics Lambda
data "archive_file" "metrics_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../Backend/metrics"
  output_path = "${path.module}/build/metrics.zip"
}
resource "aws_lambda_function" "metrics" {
  function_name    = "relo-ai-app-metrics"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.metrics"
  filename         = data.archive_file.metrics_zip.output_path
  source_code_hash = data.archive_file.metrics_zip.output_base64sha256
}

# Auth Lambda
data "archive_file" "auth_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../Backend/shared/auth"
  output_path = "${path.module}/build/auth.zip"
}
resource "aws_lambda_function" "auth" {
  function_name    = "relo-ai-app-auth"
  role             = aws_iam_role.lambda_role_auth.arn
  runtime          = "nodejs22.x"
  handler          = "handler.auth"
  filename         = data.archive_file.auth_zip.output_path
  source_code_hash = data.archive_file.auth_zip.output_base64sha256
}