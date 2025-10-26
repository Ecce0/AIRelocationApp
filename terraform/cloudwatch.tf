resource "aws_cloudwatch_log_group" "ping_logs" {
  name              = "/aws/lambda/${aws_lambda_function.ping.function_name}"
  retention_in_days = 7
  tags = {
    Project = "relo-calc-app"
    Env     = "dev"
  }
}

resource "aws_cloudwatch_log_group" "cost_of_living_logs" {
  name              = "/aws/lambda/${aws_lambda_function.cost_of_living.function_name}"
  retention_in_days = 7
  tags = {
    Project = "relo-calc-app"
    Env     = "dev"
  }
}

resource "aws_cloudwatch_log_group" "salary_logs" {
  name              = "/aws/lambda/${aws_lambda_function.salary.function_name}"
  retention_in_days = 7
  tags = {
    Project = "relo-calc-app"
    Env     = "dev"
  }
}

resource "aws_cloudwatch_log_group" "metrics_logs" {
  name              = "/aws/lambda/${aws_lambda_function.metrics.function_name}"
  retention_in_days = 7
  tags = {
    Project = "relo-calc-app"
    Env     = "dev"
  }
}

# Auth is in Backend/shared/auth/
resource "aws_cloudwatch_log_group" "auth_logs" {
  name              = "/aws/lambda/${aws_lambda_function.auth.function_name}"
  retention_in_days = 7
  tags = {
    Project = "relo-calc-app"
    Env     = "dev"
  }
}
