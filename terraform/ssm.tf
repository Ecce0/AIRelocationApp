
resource "aws_ssm_parameter" "zyla_api_key" {
  name  = "/relo-calc-app/zyla_api_key"
  type  = "SecureString"
  value = var.zyla_api_key
}

resource "aws_ssm_parameter" "zyla_api_url" {
  name  = "/relo-calc-app/zyla_api_url"
  type  = "String"
  value = var.zyla_api_url
}

resource "aws_ssm_parameter" "openwebninja_api_key" {
  name  = "/relo-calc-app/openwebninja_api_key"
  type  = "SecureString"
  value = var.openwebninja_api_key
}

resource "aws_ssm_parameter" "openwebninja_api_url" {
  name  = "/relo-calc-app/openwebninja_api_url"
  type  = "String"
  value = var.openwebninja_api_url
}

data "aws_region" "current" {}


data "aws_ssm_parameter" "zyla_api_key" {
  name = "/relo-calc-app/zyla_api_key"
}

data "aws_ssm_parameter" "zyla_api_url" {
  name = "/relo-calc-app/zyla_api_url"
}

data "aws_ssm_parameter" "openwebninja_api_key" {
  name = "/relo-calc-app/openwebninja_api_key"
}

data "aws_ssm_parameter" "openwebninja_api_url" {
  name = "/relo-calc-app/openwebninja_api_url"
}


resource "aws_iam_role_policy" "ssm_access" {
  role = aws_iam_role.lambda_role_auth.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["ssm:GetParameter", "ssm:GetParameters"]
        Resource = [
          "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/relo-calc-app/*"
        ]
      }
    ]
  })
}
