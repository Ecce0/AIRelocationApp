# === Custom DynamoDB Access Policy (all tables) ===
data "aws_iam_policy_document" "lambda_dynamodb" {
  statement {
    sid    = "RelocationMetricsAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]
    resources = [
      aws_dynamodb_table.relocation_metrics.arn,
      "${aws_dynamodb_table.relocation_metrics.arn}/index/*"
    ]
  }

  statement {
    sid    = "JobSalariesAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]
    resources = [
      aws_dynamodb_table.job_salaries.arn,
      "${aws_dynamodb_table.job_salaries.arn}/index/*"
    ]
  }

  statement {
    sid    = "CostOfLivingCacheAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]
    resources = [
      aws_dynamodb_table.cost_of_living_cache.arn,
      "${aws_dynamodb_table.cost_of_living_cache.arn}/index/*"
    ]
  }
}


// ====== IAM Role for Lambdas ====
resource "aws_iam_role" "lambda_role_auth" {
  name               = "relo-ai-app-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}


data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}