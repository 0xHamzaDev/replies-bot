CREATE TABLE `replies` (
	`id` integer PRIMARY KEY NOT NULL,
	`command` text,
	`reply` text,
	`server_id` integer,
	FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `servers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
