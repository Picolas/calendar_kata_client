-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2024-08-05 23:51:19.7220
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Event_id_seq";

-- Table Definition
CREATE TABLE "public"."Event" (
    "id" int4 NOT NULL DEFAULT nextval('"Event_id_seq"'::regclass),
    "title" text NOT NULL,
    "description" text NOT NULL,
    "startDate" timestamp(3) NOT NULL,
    "endDate" timestamp(3) NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" int4 NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Notification_id_seq";

-- Table Definition
CREATE TABLE "public"."Notification" (
    "id" int4 NOT NULL DEFAULT nextval('"Notification_id_seq"'::regclass),
    "content" text NOT NULL,
    "userId" int4 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "User_id_seq";

-- Table Definition
CREATE TABLE "public"."User" (
    "id" int4 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."UsersOnEvents" (
    "userId" int4 NOT NULL,
    "eventId" int4 NOT NULL,
    PRIMARY KEY ("userId","eventId")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('7458f98f-3f11-4885-b7ac-b354507265d9', 'ededf23356461e01707d14b979dc5bb1ee34a9b6e53621ae58637c329c5a40e4', '2024-08-02 00:48:24.722473+02', '20240801224824_added_read_to_notification', NULL, NULL, '2024-08-02 00:48:24.719323+02', 1),
('9174cce5-928c-41bb-96b9-966321300aed', 'aecb06af9aa9c28d6cfe1c6ee9aa125e48b8103b42f7c105c74cbf35d23a1065', '2024-07-31 15:22:54.070728+02', '20240731132254_init', NULL, NULL, '2024-07-31 15:22:54.054097+02', 1);

INSERT INTO "public"."Event" ("id", "title", "description", "startDate", "endDate", "createdAt", "creatorId") VALUES
(1, 'Repas famille test', 'Repas de famille avec Nicolas test', '2024-07-30 18:28:00', '2024-07-30 18:28:00', '2024-07-31 16:26:50.402', 1),
(2, 'Prout Vacances Rosa', 'Vacances Rosa Martinique', '2024-07-30 11:29:00', '2024-07-30 12:01:00', '2024-07-31 16:28:31.421', 1),
(3, 'Synergized 3rd generation monitorings test', 'Alias quibusdam dolor culpa assumenda autem doloremque facere possimus rem autem a reprehenderit nesciunt consequuntur doloremque repudiandae rerum similique nemo.', '2024-08-01 00:16:00', '2024-08-03 03:48:00', '2024-07-31 19:15:12.262', 1),
(4, 'Customizable grid-enabled migration test', 'Accusantium enim dolores alias ut itaque ullam vero molestiae repellat cumque qui dicta itaque est earum modi qui earum velit.', '2024-08-01 01:51:00', '2024-08-01 17:57:00', '2024-08-01 07:50:48.881', 1),
(5, 'Seamless context-sensitive websites', 'Voluptas molestiae ducimus reiciendis voluptatibus harum quis laboriosam repellendus saepe quidem ducimus esse quidem nihil et qui sint minima neque.', '2024-07-31 15:52:00', '2024-08-01 21:01:00', '2024-08-01 07:51:19.297', 1),
(7, 'Multi-channelled coherent software tests biss', 'Quidem sapiente ut eligendi sunt quas dicta qui a aspernatur quaerat dolorem sit est aut molestiae qui voluptatem odio reiciendis.', '2024-07-31 14:59:00', '2024-08-03 12:24:00', '2024-08-01 08:58:14.299', 1),
(8, 'Test d''évênement lol 2', 'Test devenement description', '2024-08-14 14:59:00', '2024-08-16 14:59:00', '2024-08-04 17:02:49.697', 1),
(9, 'Test de notification', 'Test de notification', '2024-08-16 12:44:00', '2024-08-16 21:44:00', '2024-08-04 21:45:22.794', 1),
(10, 'Vacances Rosa 2 test', 'Vacances Rosa Martinique', '2024-07-31 12:29:00', '2024-07-31 15:01:00', '2024-07-31 16:28:31.421', 2),
(11, 'Event de test 2', 'Event de test 2', '2024-08-09 02:49:00', '2024-08-09 15:52:00', '2024-08-04 21:49:39.604', 1),
(12, 'Evenement de test', 'Evenement de test', '2024-08-10 14:53:00', '2024-08-10 16:53:00', '2024-08-04 21:53:55.31', 1),
(13, 'Evenement de test', 'Evenement de test', '2024-08-10 14:53:00', '2024-08-10 16:53:00', '2024-08-04 21:53:55.31', 1),
(14, 'Evenement route 66', 'Evenement route 66
Evenement route 66', '2024-08-22 05:27:00', '2024-08-22 11:35:00', '2024-08-05 21:30:09.99', 1);

INSERT INTO "public"."Notification" ("id", "content", "userId", "createdAt", "read") VALUES
(1, 'Test de notification', 1, '2024-08-02 18:03:06.772', 't'),
(2, 'Test de notification lonnnnnnnnnnnnng', 1, '2024-08-02 18:03:06.772', 't'),
(3, 'Votre événement 5 a été mis à jour.', 1, '2024-08-03 15:12:02.344', 't'),
(4, 'L''événement 5 a été mis à jour.', 2, '2024-08-03 15:13:35.801', 'f'),
(5, 'Votre événement 5 a été mis à jour.', 1, '2024-08-03 15:13:35.801', 't'),
(6, 'L''événement Multi-channelled coherent software a été mis à jour.', 2, '2024-08-03 16:32:02.751', 'f'),
(7, 'Votre événement Multi-channelled coherent software a été mis à jour.', 1, '2024-08-03 16:32:02.752', 't'),
(8, 'L''événement Multi-channelled coherent software test a été mis à jour.', 2, '2024-08-03 16:35:13.784', 'f'),
(9, 'Votre événement Multi-channelled coherent software test a été mis à jour.', 1, '2024-08-03 16:35:13.785', 't'),
(10, 'L''événement Multi-channelled coherent software test a été mis à jour.', 2, '2024-08-03 16:36:46.13', 'f'),
(11, 'Votre événement Multi-channelled coherent software test a été mis à jour.', 1, '2024-08-03 16:36:46.132', 't'),
(12, 'L''événement Multi-channelled coherent software test a été mis à jour.', 2, '2024-08-03 16:37:13.89', 'f'),
(13, 'Votre événement Multi-channelled coherent software test a été mis à jour.', 1, '2024-08-03 16:37:13.892', 't'),
(14, 'L''événement Seamless context-sensitive websites dddddd a été mis à jour.', 2, '2024-08-03 16:39:32.468', 'f'),
(15, 'Votre événement Seamless context-sensitive websites dddddd a été mis à jour.', 1, '2024-08-03 16:39:32.47', 't'),
(16, 'Votre événement Multi-channelled coherent software test a été mis à jour.', 1, '2024-08-03 16:39:50.431', 'f'),
(17, 'L''événement Multi-channelled coherent software test a été mis à jour.', 2, '2024-08-03 16:39:50.425', 'f'),
(18, 'Votre événement Synergized 3rd generation monitoring a été mis à jour.', 1, '2024-08-03 16:41:48.168', 'f'),
(19, 'L''événement Synergized 3rd generation monitoring a été mis à jour.', 2, '2024-08-03 16:41:48.168', 'f'),
(20, 'L''événement Seamless context-sensitive websites a été mis à jour.', 2, '2024-08-03 16:42:54.383', 'f'),
(21, 'Votre événement Seamless context-sensitive websites a été mis à jour.', 1, '2024-08-03 16:42:54.384', 'f'),
(22, 'L''événement LOL Synergized 3rd generation monitoring a été mis à jour.', 2, '2024-08-03 16:43:10.191', 'f'),
(23, 'Votre événement LOL Synergized 3rd generation monitoring a été mis à jour.', 1, '2024-08-03 16:43:10.192', 'f'),
(24, 'L''événement Vacances Rosa lol a été mis à jour.', 2, '2024-08-03 16:47:15.811', 'f'),
(25, 'Votre événement Vacances Rosa lol a été mis à jour.', 1, '2024-08-03 16:47:15.813', 't'),
(26, 'L''événement Vacances Rosa a été mis à jour.', 2, '2024-08-03 16:47:46.105', 'f'),
(27, 'Votre événement Vacances Rosa a été mis à jour.', 1, '2024-08-03 16:47:46.107', 't'),
(28, 'L''événement Prout Vacances Rosa a été mis à jour.', 2, '2024-08-03 16:48:23.373', 'f'),
(29, 'Votre événement Prout Vacances Rosa a été mis à jour.', 1, '2024-08-03 16:48:23.374', 't'),
(30, 'L''événement Multi-channelled coherent software tests a été mis à jour.', 2, '2024-08-04 14:05:09.58', 'f'),
(31, 'Votre événement Multi-channelled coherent software tests a été mis à jour.', 1, '2024-08-04 14:05:09.581', 't'),
(32, 'L''événement LOL Synergized 3rd generation monitorings a été mis à jour.', 2, '2024-08-04 14:14:18.514', 'f'),
(33, 'Votre événement LOL Synergized 3rd generation monitorings a été mis à jour.', 1, '2024-08-04 14:14:18.515', 't'),
(34, 'L''événement sSeamless context-sensitive websites a été mis à jour.', 2, '2024-08-04 14:32:25.288', 'f'),
(35, 'Votre événement sSeamless context-sensitive websites a été mis à jour.', 1, '2024-08-04 14:32:25.289', 't'),
(36, 'L''événement Seamless context-sensitive websites a été mis à jour.', 2, '2024-08-04 14:34:14.273', 'f'),
(37, 'Votre événement Seamless context-sensitive websites a été mis à jour.', 1, '2024-08-04 14:34:14.275', 't'),
(38, 'L''événement Synergized 3rd generation monitorings a été mis à jour.', 2, '2024-08-04 14:36:40.474', 'f'),
(39, 'Votre événement Synergized 3rd generation monitorings a été mis à jour.', 1, '2024-08-04 14:36:40.475', 't'),
(40, 'L''événement Customizable grid-enabled migration test a été mis à jour.', 2, '2024-08-04 14:37:27.991', 'f'),
(41, 'Votre événement Customizable grid-enabled migration test a été mis à jour.', 1, '2024-08-04 14:37:27.992', 't'),
(42, 'L''événement Vacances Rosa 2 test a été mis à jour.', 1, '2024-08-04 14:39:03.81', 't'),
(43, 'Votre événement Vacances Rosa 2 test a été mis à jour.', 2, '2024-08-04 14:39:03.811', 'f'),
(44, 'L''événement Multi-channelled coherent software tests bis a été mis à jour.', 2, '2024-08-04 14:41:05.98', 'f'),
(45, 'Votre événement Multi-channelled coherent software tests bis a été mis à jour.', 1, '2024-08-04 14:41:05.982', 't'),
(46, 'L''évênement Synergized 3rd generation monitorings à été annulé.', 2, '2024-08-04 14:55:50.017', 'f'),
(47, 'Votre événement Multi-channelled coherent software tests biss a été mis à jour.', 1, '2024-08-04 15:47:06.06', 't'),
(48, 'L''événement Multi-channelled coherent software tests biss a été mis à jour.', 2, '2024-08-04 15:47:06.059', 'f'),
(49, 'Vous avez été ajouté à l''évênement Test d''évênement lol.', 2, '2024-08-04 17:02:49.734', 'f'),
(50, 'L''événement Test d''évênement lol 2 a été mis à jour.', 2, '2024-08-04 17:05:59.508', 'f'),
(51, 'Votre événement Test d''évênement lol 2 a été mis à jour.', 1, '2024-08-04 17:05:59.51', 't'),
(52, 'Votre événement Repas famille tests a été mis à jour.', 1, '2024-08-04 21:33:01.249', 't'),
(53, 'Votre événement Repas famille test a été mis à jour.', 1, '2024-08-04 21:33:20.182', 't'),
(54, 'L''événement Synergized 3rd generation monitorings test a été mis à jour.', 2, '2024-08-04 22:13:34.018', 'f'),
(55, 'Votre événement Synergized 3rd generation monitorings test a été mis à jour.', 1, '2024-08-04 22:13:34.019', 't');

INSERT INTO "public"."User" ("id", "name", "email", "password", "createdAt") VALUES
(1, 'Nicolas', 'npiplard@gmail.com', '$2a$10$9iBgIXNcaPzy0kZLEXolz.BUjxSQiIM1Q7uNseVdHgvKAPltNkmPa', '2024-07-31 15:38:08.097'),
(2, 'Rosa', 'rosa@gmail.com', '$2a$10$oXysjDF4ygnpT7jDvZviUezrZn8m.dhjSsLjyfFLrwi2yScEdQXvO', '2024-07-31 15:39:23.23'),
(3, 'Alberto', 'alberto@gmail.com', '$2a$10$eJP0N9.40IxfO.fdhNq6eO5SlcrBJNp9fy.K8ClG4Ct7WbZopaBpa', '2024-07-31 20:52:26.82'),
(4, 'Test', 'test@gmail.com', '$2a$10$v/gbGPorpu35WhqVTaelV.z.eavSBH.SjSs68FIMnIEYjHZhXmc8y', '2024-08-05 21:38:27.354'),
(5, 'test2', 'test2@gmail.com', '$2a$10$p8zI5F4nlbk8Yea2lwDReerDItVdAuc4g57CsA0UDAkQgG49QCK56', '2024-08-05 21:41:09.323');

INSERT INTO "public"."UsersOnEvents" ("userId", "eventId") VALUES
(1, 10),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 7),
(2, 8);

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Notification" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
ALTER TABLE "public"."UsersOnEvents" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."UsersOnEvents" ADD FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
