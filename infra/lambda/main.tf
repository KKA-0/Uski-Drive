data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_lambda_function" "test_lambda" {
  function_name = "uski-drive-modified"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"

  runtime = "nodejs18.x"

  # Specify the location of your backend.zip after upload
  filename         = "backend.zip"
  source_code_hash = filebase64sha256("backend.zip")

}
