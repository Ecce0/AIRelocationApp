# Create an HTTP API Gateway
resource "aws_apigatewayv2_api" "relo_app_api" {
  name          = "relo-ai-app-api"
  protocol_type = "HTTP"
}

# Deployment + stage
resource "aws_apigatewayv2_stage" "dev_stage" {
  api_id      = aws_apigatewayv2_api.relo_app_api.id
  name        = "dev"
  auto_deploy = true
}


## ===== PING ========
# Integrate API Gateway with the Lambda
resource "aws_apigatewayv2_integration" "ping_integration" {
  api_id             = aws_apigatewayv2_api.relo_app_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.ping.arn
  integration_method = "POST"
}

# GET /ping → Lambda
resource "aws_apigatewayv2_route" "ping_route" {
  api_id    = aws_apigatewayv2_api.relo_app_api.id
  route_key = "GET /ping"
  target    = "integrations/${aws_apigatewayv2_integration.ping_integration.id}"
}

# Grant API Gateway permission to invoke Lambda
resource "aws_lambda_permission" "ping_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ping.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.relo_app_api.execution_arn}/*/*"
}


## ===== SALARY ========
resource "aws_apigatewayv2_integration" "salary_integration" {
  api_id             = aws_apigatewayv2_api.relo_app_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.salary.arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "salary_route" {
  api_id    = aws_apigatewayv2_api.relo_app_api.id
  route_key = "GET /salary"
  target    = "integrations/${aws_apigatewayv2_integration.salary_integration.id}"
}

resource "aws_lambda_permission" "salary_permission" {
  statement_id  = "AllowAPIGatewayInvokeSalary"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.salary.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.relo_app_api.execution_arn}/*/*"
}

## ===== COL ========
resource "aws_apigatewayv2_integration" "col_integration" {
  api_id             = aws_apigatewayv2_api.relo_app_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.cost_of_living.arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "col_route" {
  api_id    = aws_apigatewayv2_api.relo_app_api.id
  route_key = "POST /cost-of-living"
  target    = "integrations/${aws_apigatewayv2_integration.col_integration.id}"
}

resource "aws_lambda_permission" "col_permission" {
  statement_id  = "AllowAPIGatewayInvokeCOL"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cost_of_living.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.relo_app_api.execution_arn}/*/*"
}


## ===== METRICS ========
resource "aws_apigatewayv2_integration" "metrics_integration" {
  api_id             = aws_apigatewayv2_api.relo_app_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.metrics.arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "metrics_route" {
  api_id    = aws_apigatewayv2_api.relo_app_api.id
  route_key = "POST /metrics"
  target    = "integrations/${aws_apigatewayv2_integration.metrics_integration.id}"
}

resource "aws_lambda_permission" "metrics_permission" {
  statement_id  = "AllowAPIGatewayInvokeMetrics"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.metrics.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.relo_app_api.execution_arn}/*/*"
}

## ===== AUTH ========
// save for AWS Cognito + OAuth2


## ===== OUTPUTS ========

output "api_gateway_url" {
  value = "${aws_apigatewayv2_stage.dev_stage.invoke_url}"
}

