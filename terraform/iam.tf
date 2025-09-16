#Creates an IAM Role - this is specifically for the lambdas
resource "aws_iam_role" "lambda_role_auth" {
  name               = "relo-ai-app-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

#Trust Policy - WHO can assume the role
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

#Attaches AWS’s managed policy - allows Lambdas to write logs to CloudWatch
resource "aws_iam_role_policy_attachment" "lambda_cloudwatch_logs" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

#JSON file that grants only the DynamoDB actions your Lambda needs
data "aws_iam_policy_document" "lambda_dynamodb_json" {
  statement {
    sid    = "RelocationMetricsTableAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem"
    ]
    resources = [
      aws_dynamodb_table.relocation_metrics.arn,         
      "${aws_dynamodb_table.relocation_metrics.arn}/*"    
    ]
  }
}

#Creates an IAM policy object from the JSON file 'lambda_dynamodb_json'
resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name   = "relo-ai-app-lambda-dynamodb-policy"
  policy = data.aws_iam_policy_document.lambda_dynamodb_json.json
}

#Attachs the custom DynamoDB permissions to the Lambda role
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attach" {
  role       = aws_iam_role.lambda_role_auth.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}