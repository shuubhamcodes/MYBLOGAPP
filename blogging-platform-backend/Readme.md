# Create core directories
mkdir src src\config src\controllers src\models src\routes src\middleware src\services src\utils src\types src\tests

# Create core files
New-Item -ItemType File src\app.ts
New-Item -ItemType File src\server.ts
New-Item -ItemType File src\config\db.ts
New-Item -ItemType File src\config\jwtConfig.ts
New-Item -ItemType File src\config\env.ts
New-Item -ItemType File src\utils\handleError.ts
New-Item -ItemType File src\utils\logger.ts
New-Item -ItemType File src\utils\asyncHandler.ts
New-Item -ItemType File src\types\Request.ts

# Add files for controllers
New-Item -ItemType File src\controllers\authController.ts
New-Item -ItemType File src\controllers\blogController.ts
New-Item -ItemType File src\controllers\commentController.ts

# Add files for models
New-Item -ItemType File src\models\User.ts
New-Item -ItemType File src\models\Blog.ts
New-Item -ItemType File src\models\Comment.ts

# Add files for routes
New-Item -ItemType File src\routes\authRoutes.ts
New-Item -ItemType File src\routes\blogRoutes.ts
New-Item -ItemType File src\routes\commentRoutes.ts

# Add files for middleware
New-Item -ItemType File src\middleware\authMiddleware.ts
New-Item -ItemType File src\middleware\errorMiddleware.ts
New-Item -ItemType File src\middleware\validationMiddleware.ts

# Add files for services
New-Item -ItemType File src\services\authService.ts
New-Item -ItemType File src\services\blogService.ts
New-Item -ItemType File src\services\commentService.ts

# Add test files (optional)
New-Item -ItemType File src\tests\auth.test.ts
New-Item -ItemType File src\tests\blog.test.ts
New-Item -ItemType File src\tests\utils.test.ts
