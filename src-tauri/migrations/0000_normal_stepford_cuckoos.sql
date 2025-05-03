CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`age` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
