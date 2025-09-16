output "lambda_role_arn" {
  value = aws_iam_role.lambda_role_auth.arn
}


output "relocation_metrics_table_arn" {
  value = aws_dynamodb_table.relocation_metrics.arn
}