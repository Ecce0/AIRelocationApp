output "lambda_role_arn" {
  value = aws_iam_role.lambda_role_auth.arn
}

output "relocation_metrics_table_arn" {
  value = aws_dynamodb_table.relocation_metrics.arn
}

output "job_salaries_table_arn" {
  value = aws_dynamodb_table.job_salaries.arn
}

output "frontend_bucket_url" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}