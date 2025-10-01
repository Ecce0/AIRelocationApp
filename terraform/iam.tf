data "aws_caller_identity" "current" {}

# ===== Lambda Assume Role Policy =====
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

# ===== IAM Role for Lambdas =====
resource "aws_iam_role" "lambda_role_auth" {
  name               = "relo-ai-app-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

# ===== Policy Document: DynamoDB + SSM =====
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

  statement {
    sid    = "ReloAiAppCacheAccess"
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
      aws_dynamodb_table.relo_ai_app_cache.arn,
      "${aws_dynamodb_table.relo_ai_app_cache.arn}/index/*"
    ]
  }

  statement {
    sid    = "SSMParameterAccess"
    effect = "Allow"
    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
      "ssm:GetParametersByPath"
    ]
    resources = [
      "arn:aws:ssm:us-east-1:${data.aws_caller_identity.current.account_id}:parameter/relo-ai-app/*"
    ]
  }
}

# ===== Create the IAM Policy =====
resource "aws_iam_policy" "lambda_dynamodb" {
  name        = "relo-ai-app-lambda-policy"
  description = "DynamoDB + SSM access for Lambda functions"
  policy      = data.aws_iam_policy_document.lambda_dynamodb.json
}

# ===== Attach Custom Policy to Role =====
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attach" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = aws_iam_policy.lambda_dynamodb.arn
}

# ===== Attach Managed CloudWatch Logs Policy =====
resource "aws_iam_role_policy_attachment" "lambda_logging" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
