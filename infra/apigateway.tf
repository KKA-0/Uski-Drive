resource "aws_apigatewayv2_api" "my_http_api" {
  name          = "UskiDrive-API"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.my_http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.test_lambda.invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.my_http_api.id
  route_key = "ANY $default"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "api_stage" {
  api_id      = aws_apigatewayv2_api.my_http_api.id
  name        = "$default"
  auto_deploy = true
}
output "api_endpoint" {
  value = aws_apigatewayv2_stage.api_stage.invoke_url
}

resource "aws_lambda_permission" "allow_apigateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.test_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.my_http_api.execution_arn}/*/*"
}
