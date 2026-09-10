resource "aws_ecr_repository" "app" {
  name = var.project_name
  force_delete = true
  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "IMMUTABLE"

  tags = {
    Project     = var.project_name
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}
