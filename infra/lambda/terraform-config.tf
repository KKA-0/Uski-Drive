terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  cloud {

    organization = "jadonharsh"

    workspaces {
      name = "uskidrive"
    }
  }
}
