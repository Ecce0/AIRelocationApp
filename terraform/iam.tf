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
  name               = "relo-calc-app-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

# ===== Policy Document: DynamoDB =====
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
    sid    = "ReloCaclAppCacheAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]
    resources = [
      aws_dynamodb_table.relo_calc_app_cache.arn,
      "${aws_dynamodb_table.relo_calc_app_cache.arn}/index/*"
    ]
  }

  statement {
  sid    = "RelocationSalariesAccess"
  effect = "Allow"
  actions = [
    "dynamodb:GetItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  ]
  resources = [
    aws_dynamodb_table.relocation_salaries.arn,
    "${aws_dynamodb_table.relocation_salaries.arn}/index/*"
  ]
}


statement {
  sid    = "RelocationColAccess"
  effect = "Allow"
  actions = [
    "dynamodb:GetItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  ]
  resources = [
    aws_dynamodb_table.relocation_col.arn,
    "${aws_dynamodb_table.relocation_col.arn}/index/*"
  ]
}
}

# ===== Create the IAM Policy =====
resource "aws_iam_policy" "lambda_dynamodb" {
  name        = "relo-calc-app-lambda-policy"
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
