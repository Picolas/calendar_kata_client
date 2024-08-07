INSERT INTO "User" ("name", "email", "password", "createdAt") VALUES
('Nicolas', 'npiplard@gmail.com', '$2a$10$9iBgIXNcaPzy0kZLEXolz.BUjxSQiIM1Q7uNseVdHgvKAPltNkmPa', '2024-07-31 15:38:08.097'),
('Rosa', 'rosa@gmail.com', '$2a$10$oXysjDF4ygnpT7jDvZviUezrZn8m.dhjSsLjyfFLrwi2yScEdQXvO', '2024-07-31 15:39:23.23'),
('Alberto', 'alberto@gmail.com', '$2a$10$eJP0N9.40IxfO.fdhNq6eO5SlcrBJNp9fy.K8ClG4Ct7WbZopaBpa', '2024-07-31 20:52:26.82'),
('Test', 'test@gmail.com', '$2a$10$v/gbGPorpu35WhqVTaelV.z.eavSBH.SjSs68FIMnIEYjHZhXmc8y', '2024-08-05 21:38:27.354'),
('test2', 'test2@gmail.com', '$2a$10$p8zI5F4nlbk8Yea2lwDReerDItVdAuc4g57CsA0UDAkQgG49QCK56', '2024-08-05 21:41:09.323');

INSERT INTO "Event" ("title", "description", "startDate", "endDate", "createdAt", "creatorId") VALUES
('Repas famille test', 'Repas de famille avec Nicolas', '2024-07-30 18:28:00', '2024-07-30 18:28:00', '2024-07-31 16:26:50.402', 1),
('Vacances Rosa', 'Vacances Rosa Martinique', '2024-07-30 11:29:00', '2024-07-30 12:01:00', '2024-07-31 16:28:31.421', 1),
('Synergized 3rd generation monitorings test', 'Alias quibusdam dolor culpa assumenda autem doloremque facere possimus rem autem a reprehenderit nesciunt consequuntur doloremque repudiandae rerum similique nemo.', '2024-08-01 00:16:00', '2024-08-03 03:48:00', '2024-07-31 19:15:12.262', 1),
('Customizable grid-enabled migration test', 'Accusantium enim dolores alias ut itaque ullam vero molestiae repellat cumque qui dicta itaque est earum modi qui earum velit.', '2024-08-01 01:51:00', '2024-08-01 17:57:00', '2024-08-01 07:50:48.881', 1),
('Seamless context-sensitive websites', 'Voluptas molestiae ducimus reiciendis voluptatibus harum quis laboriosam repellendus saepe quidem ducimus esse quidem nihil et qui sint minima neque.', '2024-07-31 15:52:00', '2024-08-01 21:01:00', '2024-08-01 07:51:19.297', 1);

INSERT INTO "Notification" ("content", "userId", "createdAt", "read") VALUES
('Test de notification', 1, '2024-08-02 18:03:06.772', true),
('Test de notification lonnnnnnnnnnnnng', 1, '2024-08-02 18:03:06.772', true),
('Votre événement 5 a été mis à jour.', 1, '2024-08-03 15:12:02.344', true),
('L''événement 5 a été mis à jour.', 2, '2024-08-03 15:13:35.801', false),
('Votre événement 5 a été mis à jour.', 1, '2024-08-03 15:13:35.801', true);

INSERT INTO "UsersOnEvents" ("userId", "eventId") VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5);