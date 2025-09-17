resource "aws_cloudwatch_log_group" "ping_logs" {
  name              = "/aws/lambda/${aws_lambda_function.ping.function_name}"
  retention_in_days = 7

  tags = {
    Project = "relo-ai-app"
    Env     = "dev"
  }
}
