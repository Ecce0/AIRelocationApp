# IAM Role for Lambdas
resource "aws_iam_role" "lambda_role_auth" {
  name               = "relo-ai-app-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

# Trust policy (who can assume role)
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

# Attach managed policy for CloudWatch logging
resource "aws_iam_role_policy_attachment" "lambda_cloudwatch_logs" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# === Custom DynamoDB Access Policy (both tables) ===
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
}

resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name   = "relo-ai-app-lambda-dynamodb-policy"
  policy = data.aws_iam_policy_document.lambda_dynamodb.json
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attach" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}


#API Lambda read access for secure parameter key
data "aws_iam_policy_document" "lambda_ssm_access" {
  statement {
    sid     = "ReadOpenWebNinjaKey"
    effect  = "Allow"
    actions = ["ssm:GetParameter"]
    resources = [
      "arn:aws:ssm:us-east-1:${data.aws_caller_identity.current.account_id}:parameter/relo-ai-app/openwebninja_api_key"
    ]
  }
}

resource "aws_iam_policy" "lambda_ssm_policy" {
  name   = "relo-ai-app-lambda-ssm-policy"
  policy = data.aws_iam_policy_document.lambda_ssm_access.json
}

resource "aws_iam_role_policy_attachment" "lambda_ssm_attach" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = aws_iam_policy.lambda_ssm_policy.arn
}

data "aws_caller_identity" "current" {}
