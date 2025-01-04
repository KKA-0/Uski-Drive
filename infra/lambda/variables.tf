variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
}

variable "lambda_function_name" {
  description = "The name of the Lambda function."
  type        = string
}

variable "lambda_role_name" {
  description = "The name of the IAM role for Lambda."
  type        = string
}

variable "lambda_runtime" {
  description = "The runtime environment for the Lambda function."
  type        = string
}

variable "handler_name" {
  description = "The function entry point in your code."
  type        = string
}

variable "source_code_filename" {
  description = "The path to the source code file for the Lambda function."
  type        = string
}
