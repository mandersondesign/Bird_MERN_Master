--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: pace; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.pace (pace_id, name, description, coach_id, created_at) VALUES (1, 'Test pace', 'Test description', NULL, '2019-12-19 10:23:06');


--
-- Data for Name: phase; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (6, 'Peak', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (7, 'Fine Tuning', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (8, 'Taper', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (1, 'Build a Base', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (2, 'Develop Speed', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (3, 'Recovery', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (4, 'Tackle Hills', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (5, 'Grow Endurance', '', NULL, '2019-12-17 11:56:26');
INSERT INTO plan.phase (phase_id, name, description, coach_id, created_at) VALUES (9, 'Race', '', NULL, '2019-12-17 11:56:26');


--
-- Data for Name: plan_template; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (1, 'Half Marathon Beginner Plan', 1, NULL);
INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (2, 'Half Marathon Advanced Plan', 1, NULL);
INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (3, 'Marathon Beginner Plan', 2, NULL);
INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (4, 'Marathon Intermediate Plan', 2, NULL);
INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (6, 'Ultra Marathon', 3, NULL);
INSERT INTO plan.plan_template (plan_template_id, name, event_id, coach_id) VALUES (5, 'Marathon Advanced Plan', 2, NULL);


--
-- Data for Name: plan_week_template; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (29, 3, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (30, 3, 1, 2, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (31, 3, 3, 3, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (32, 3, 2, 4, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (33, 3, 2, 5, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (34, 3, 3, 6, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (35, 3, 4, 7, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (36, 3, 4, 8, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (37, 3, 3, 9, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (38, 3, 5, 10, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (39, 3, 5, 11, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (40, 3, 3, 12, '', 8);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (41, 3, 5, 13, '', 9);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (42, 3, 3, 14, '', 10);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (43, 3, 6, 15, '', 11);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (44, 3, 7, 16, '', 12);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (45, 3, 8, 17, '', 13);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (46, 3, 9, 18, '', 14);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (47, 4, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (48, 4, 1, 2, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (49, 4, 3, 3, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (50, 4, 2, 4, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (51, 4, 2, 5, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (52, 4, 3, 6, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (53, 4, 4, 7, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (54, 4, 4, 8, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (55, 4, 3, 9, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (56, 4, 5, 10, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (57, 4, 5, 11, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (58, 4, 3, 12, '', 8);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (59, 4, 5, 13, '', 9);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (60, 4, 3, 14, '', 10);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (61, 4, 6, 15, '', 11);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (62, 4, 7, 16, '', 12);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (63, 4, 8, 17, '', 13);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (64, 4, 9, 18, '', 14);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (66, 5, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (67, 5, 1, 2, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (68, 5, 3, 3, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (69, 5, 2, 4, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (1, 1, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (2, 1, 1, 2, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (3, 1, 2, 3, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (4, 1, 3, 4, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (5, 1, 4, 5, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (6, 1, 4, 6, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (7, 1, 3, 7, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (8, 1, 5, 8, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (9, 1, 5, 9, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (10, 1, 3, 10, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (11, 1, 6, 11, '', 8);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (12, 1, 7, 12, '', 9);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (13, 1, 8, 13, '', 10);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (14, 1, 9, 14, '', 11);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (17, 2, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (18, 2, 2, 2, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (19, 2, 2, 3, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (20, 2, 4, 4, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (21, 2, 3, 5, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (22, 2, 4, 6, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (23, 2, 5, 7, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (24, 2, 3, 8, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (25, 2, 6, 9, '', 8);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (26, 2, 7, 10, '', 9);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (27, 2, 8, 11, '', 10);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (28, 2, 9, 12, '', 11);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (70, 5, 2, 5, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (71, 5, 3, 6, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (72, 5, 4, 7, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (73, 5, 4, 8, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (74, 5, 3, 9, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (75, 5, 5, 10, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (76, 5, 5, 11, '', 7);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (77, 5, 3, 12, '', 8);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (78, 5, 5, 13, '', 9);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (79, 5, 3, 14, '', 10);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (80, 5, 6, 15, '', 11);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (81, 5, 7, 16, '', 12);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (82, 5, 8, 17, '', 13);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (83, 5, 9, 18, '', 14);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (84, 6, 1, 1, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (85, 6, 1, 2, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (86, 6, 1, 3, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (87, 6, 1, 4, '', 1);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (88, 6, 2, 5, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (89, 6, 2, 6, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (90, 6, 2, 7, '', 2);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (91, 6, 4, 8, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (92, 6, 4, 9, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (93, 6, 4, 10, '', 3);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (94, 6, 5, 11, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (95, 6, 5, 12, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (96, 6, 5, 13, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (97, 6, 5, 14, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (98, 6, 5, 15, '', 4);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (99, 6, 7, 16, '', 5);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (100, 6, 8, 17, '', 6);
INSERT INTO plan.plan_week_template (plan_week_template_id, plan_template_id, phase_id, number_of_week, description, number_of_phase) VALUES (101, 6, 9, 18, '', 7);


--
-- Data for Name: workout_type; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.workout_type (workout_type_id, name) VALUES (1, 'Tempo');
INSERT INTO plan.workout_type (workout_type_id, name) VALUES (2, 'Speed');
INSERT INTO plan.workout_type (workout_type_id, name) VALUES (3, 'Long run');
INSERT INTO plan.workout_type (workout_type_id, name) VALUES (4, 'Sandwich Run');


--
-- Data for Name: workout_template; Type: TABLE DATA; Schema: plan; Owner: birduser
--

INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (424, 'Mon', 1, 1, '', 1, 5.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (425, 'Mon', 1, 1, '', 1, 5.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (426, 'Mon', 1, 1, '', 1, 5.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (427, 'Mon', 1, 1, '', 1, 5.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (428, 'Mon', 1, 1, '', 1, 5.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (429, 'Mon', 1, 1, '', 1, 5.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (430, 'Mon', 1, 1, '', 1, 5.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (431, 'Mon', 1, 1, '', 1, 5.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (432, 'Mon', 1, 1, '', 1, 5.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (433, 'Mon', 1, 1, '', 1, 5.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (434, 'Mon', 1, 1, '', 1, 5.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (435, 'Mon', 1, 1, '', 1, 5.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (436, 'Mon', 1, 1, '', 1, 5.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (437, 'Mon', 1, 1, '', 1, 5.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (438, 'Mon', 1, 1, '', 1, 5.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (439, 'Mon', 1, 1, '', 1, 5.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (440, 'Mon', 1, 1, '', 1, 5.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (441, 'Tempo', 1, 2, '', 1, 4.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (442, 'Tempo', 1, 2, '', 1, 5.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (443, 'Tempo', 1, 2, '', 1, 5.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (444, 'Tempo', 1, 2, '', 1, 4.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (445, 'Tempo', 1, 2, '', 1, 6.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (446, 'Tempo', 1, 2, '', 1, 6.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (447, 'Tempo', 1, 2, '', 1, 5.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (448, 'Tempo', 1, 2, '', 1, 6.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (449, 'Tempo', 1, 2, '', 1, 7.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (450, 'Tempo', 1, 2, '', 1, 6.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (451, 'Tempo', 1, 2, '', 1, 7.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (452, 'Tempo', 1, 2, '', 1, 6.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (453, 'Tempo', 1, 2, '', 1, 8.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (454, 'Tempo', 1, 2, '', 1, 6.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (455, 'Tempo', 1, 2, '', 1, 8.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (456, 'Tempo', 1, 2, '', 1, 6.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (457, 'Tempo', 1, 2, '', 1, 5.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (458, 'Tempo', 1, 2, '', 1, 4.000, 101);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (459, 'Speed', 2, 4, '', 1, 4.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (460, 'Speed', 2, 4, '', 1, 5.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (461, 'Speed', 2, 4, '', 1, 5.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (462, 'Speed', 2, 4, '', 1, 4.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (463, 'Speed', 2, 4, '', 1, 6.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (464, 'Speed', 2, 4, '', 1, 6.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (465, 'Speed', 2, 4, '', 1, 5.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (466, 'Speed', 2, 4, '', 1, 6.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (467, 'Speed', 2, 4, '', 1, 7.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (468, 'Speed', 2, 4, '', 1, 6.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (469, 'Speed', 2, 4, '', 1, 7.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (470, 'Speed', 2, 4, '', 1, 6.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (471, 'Speed', 2, 4, '', 1, 8.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (472, 'Speed', 2, 4, '', 1, 6.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (473, 'Speed', 2, 4, '', 1, 8.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (474, 'Speed', 2, 4, '', 1, 6.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (475, 'Speed', 2, 4, '', 1, 5.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (476, 'Speed', 2, 4, '', 1, 4.000, 101);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (477, 'Fri', 2, 5, '', 1, 5.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (478, 'Fri', 2, 5, '', 1, 5.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (479, 'Fri', 2, 5, '', 1, 5.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (480, 'Fri', 2, 5, '', 1, 5.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (481, 'Fri', 2, 5, '', 1, 5.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (482, 'Fri', 2, 5, '', 1, 5.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (483, 'Fri', 2, 5, '', 1, 5.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (484, 'Fri', 2, 5, '', 1, 5.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (485, 'Fri', 2, 5, '', 1, 5.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (486, 'Fri', 2, 5, '', 1, 5.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (487, 'Fri', 2, 5, '', 1, 5.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (488, 'Fri', 2, 5, '', 1, 5.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (489, 'Fri', 2, 5, '', 1, 5.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (490, 'Fri', 2, 5, '', 1, 5.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (491, 'Fri', 2, 5, '', 1, 5.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (492, 'Fri', 2, 5, '', 1, 5.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (493, 'Fri', 2, 5, '', 1, 5.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (494, 'Long Run', 3, 6, '', 1, 8.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (495, 'Long Run', 3, 6, '', 1, 10.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (496, 'Long Run', 3, 6, '', 1, 12.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (497, 'Long Run', 3, 6, '', 1, 10.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (498, 'Long Run', 3, 6, '', 1, 14.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (499, 'Long Run', 3, 6, '', 1, 16.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (500, 'Long Run', 3, 6, '', 1, 12.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (501, 'Long Run', 3, 6, '', 1, 18.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (502, 'Long Run', 3, 6, '', 1, 20.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (503, 'Long Run', 3, 6, '', 1, 16.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (504, 'Long Run', 3, 6, '', 1, 22.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (505, 'Long Run', 3, 6, '', 1, 16.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (506, 'Long Run', 3, 6, '', 1, 24.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (507, 'Long Run', 3, 6, '', 1, 16.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (508, 'Long Run', 3, 6, '', 1, 26.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (509, 'Long Run', 3, 6, '', 1, 14.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (510, 'Long Run', 3, 6, '', 1, 10.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (511, 'Long Run', 3, 6, '', 1, 3.000, 101);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (512, 'Sandwich Run', 4, 7, '', 1, 4.000, 84);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (513, 'Sandwich Run', 4, 7, '', 1, 5.000, 85);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (514, 'Sandwich Run', 4, 7, '', 1, 5.000, 86);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (515, 'Sandwich Run', 4, 7, '', 1, 4.000, 87);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (516, 'Sandwich Run', 4, 7, '', 1, 6.000, 88);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (517, 'Sandwich Run', 4, 7, '', 1, 6.000, 89);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (518, 'Sandwich Run', 4, 7, '', 1, 5.000, 90);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (519, 'Sandwich Run', 4, 7, '', 1, 6.000, 91);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (520, 'Sandwich Run', 4, 7, '', 1, 6.000, 92);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (521, 'Sandwich Run', 4, 7, '', 1, 5.000, 93);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (522, 'Sandwich Run', 4, 7, '', 1, 7.000, 94);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (523, 'Sandwich Run', 4, 7, '', 1, 5.000, 95);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (524, 'Sandwich Run', 4, 7, '', 1, 7.000, 96);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (525, 'Sandwich Run', 4, 7, '', 1, 5.000, 97);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (526, 'Sandwich Run', 4, 7, '', 1, 8.000, 98);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (527, 'Sandwich Run', 4, 7, '', 1, 6.000, 99);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (528, 'Sandwich Run', 4, 7, '', 1, 5.000, 100);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (529, 'Sandwich Run', 4, 7, '', 1, 31.000, 101);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (3, 'Tempo', 1, 2, '', 1, 3.000, 1);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (4, 'Tempo', 1, 2, '', 1, 3.500, 2);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (5, 'Tempo', 1, 2, '', 1, 4.000, 3);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (6, 'Tempo', 1, 2, '', 1, 3.000, 4);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (7, 'Tempo', 1, 2, '', 1, 4.000, 5);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (8, 'Tempo', 1, 2, '', 1, 5.000, 6);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (9, 'Tempo', 1, 2, '', 1, 3.000, 7);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (10, 'Tempo', 1, 2, '', 1, 5.000, 8);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (11, 'Tempo', 1, 2, '', 1, 5.000, 9);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (12, 'Tempo', 1, 2, '', 1, 4.000, 10);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (13, 'Tempo', 1, 2, '', 1, 6.000, 11);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (14, 'Tempo', 1, 2, '', 1, 5.000, 12);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (15, 'Tempo', 1, 2, '', 1, 4.000, 13);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (16, 'Tempo', 1, 2, '', 1, 3.000, 14);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (17, 'Speed', 2, 4, '', 1, 3.000, 1);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (18, 'Speed', 2, 4, '', 1, 3.500, 2);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (19, 'Speed', 2, 4, '', 1, 4.000, 3);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (20, 'Speed', 2, 4, '', 1, 3.000, 4);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (21, 'Speed', 2, 4, '', 1, 4.000, 5);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (62, 'Tempo', 1, 2, '', 1, 6.000, 23);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (63, 'Tempo', 1, 2, '', 1, 5.000, 24);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (64, 'Tempo', 1, 2, '', 1, 7.000, 25);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (65, 'Tempo', 1, 2, '', 1, 6.000, 26);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (66, 'Tempo', 1, 2, '', 1, 5.000, 27);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (67, 'Tempo', 1, 2, '', 1, 3.500, 28);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (68, 'Speed', 2, 4, '', 1, 4.000, 17);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (69, 'Speed', 2, 4, '', 1, 4.000, 18);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (70, 'Speed', 2, 4, '', 1, 5.000, 19);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (22, 'Speed', 2, 4, '', 1, 5.000, 6);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (23, 'Speed', 2, 4, '', 1, 3.000, 7);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (24, 'Speed', 2, 4, '', 1, 5.000, 8);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (25, 'Speed', 2, 4, '', 1, 5.000, 9);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (26, 'Speed', 2, 4, '', 1, 4.000, 10);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (27, 'Speed', 2, 4, '', 1, 6.000, 11);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (28, 'Speed', 2, 4, '', 1, 5.000, 12);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (29, 'Speed', 2, 4, '', 1, 4.000, 13);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (30, 'Speed', 2, 4, '', 1, 3.000, 14);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (31, 'Long Run', 3, 6, '', 1, 6.000, 1);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (32, 'Long Run', 3, 6, '', 1, 7.000, 2);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (33, 'Long Run', 3, 6, '', 1, 8.000, 3);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (34, 'Long Run', 3, 6, '', 1, 5.000, 4);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (35, 'Long Run', 3, 6, '', 1, 9.000, 5);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (36, 'Long Run', 3, 6, '', 1, 10.000, 6);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (358, 'Fri', 2, 5, '', 1, 5.000, 74);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (359, 'Fri', 2, 5, '', 1, 5.000, 75);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (360, 'Fri', 2, 5, '', 1, 5.000, 76);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (361, 'Fri', 2, 5, '', 1, 5.000, 77);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (362, 'Fri', 2, 5, '', 1, 5.000, 78);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (363, 'Fri', 2, 5, '', 1, 5.000, 79);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (364, 'Fri', 2, 5, '', 1, 5.000, 80);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (365, 'Fri', 2, 5, '', 1, 5.000, 81);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (366, 'Fri', 2, 5, '', 1, 5.000, 82);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (405, 'Long Run', 3, 6, '', 1, 9.000, 66);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (406, 'Long Run', 3, 6, '', 1, 10.000, 67);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (407, 'Long Run', 3, 6, '', 1, 8.000, 68);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (408, 'Long Run', 3, 6, '', 1, 12.000, 69);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (409, 'Long Run', 3, 6, '', 1, 14.000, 70);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (410, 'Long Run', 3, 6, '', 1, 10.000, 71);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (411, 'Long Run', 3, 6, '', 1, 16.000, 72);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (412, 'Long Run', 3, 6, '', 1, 17.000, 73);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (413, 'Long Run', 3, 6, '', 1, 13.000, 74);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (414, 'Long Run', 3, 6, '', 1, 18.000, 75);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (415, 'Long Run', 3, 6, '', 1, 20.000, 76);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (416, 'Long Run', 3, 6, '', 1, 13.000, 77);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (417, 'Long Run', 3, 6, '', 1, 20.000, 78);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (418, 'Long Run', 3, 6, '', 1, 13.000, 79);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (419, 'Long Run', 3, 6, '', 1, 22.000, 80);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (420, 'Long Run', 3, 6, '', 1, 14.000, 81);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (421, 'Long Run', 3, 6, '', 1, 10.000, 82);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (422, 'Long Run', 3, 6, '', 1, 3.000, 83);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (37, 'Long Run', 3, 6, '', 1, 7.000, 7);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (38, 'Long Run', 3, 6, '', 1, 11.000, 8);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (39, 'Long Run', 3, 6, '', 1, 12.000, 9);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (40, 'Long Run', 3, 6, '', 1, 9.000, 10);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (41, 'Long Run', 3, 6, '', 1, 13.000, 11);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (42, 'Long Run', 3, 6, '', 1, 10.000, 12);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (43, 'Long Run', 3, 6, '', 1, 7.000, 13);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (44, 'Long Run', 3, 6, '', 1, 2.000, 14);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (45, 'Tempo', 1, 1, '', 1, 3.000, 17);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (46, 'Tempo', 1, 1, '', 1, 3.000, 18);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (47, 'Tempo', 1, 1, '', 1, 3.000, 19);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (48, 'Tempo', 1, 1, '', 1, 3.000, 20);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (49, 'Tempo', 1, 1, '', 1, 3.000, 21);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (50, 'Tempo', 1, 1, '', 1, 3.000, 22);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (51, 'Tempo', 1, 1, '', 1, 3.000, 23);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (52, 'Tempo', 1, 1, '', 1, 3.000, 24);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (53, 'Tempo', 1, 1, '', 1, 3.000, 25);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (54, 'Tempo', 1, 1, '', 1, 3.000, 26);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (55, 'Tempo', 1, 1, '', 1, 3.000, 27);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (56, 'Tempo', 1, 2, '', 1, 4.000, 17);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (57, 'Tempo', 1, 2, '', 1, 4.000, 18);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (58, 'Tempo', 1, 2, '', 1, 5.000, 19);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (59, 'Tempo', 1, 2, '', 1, 5.000, 20);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (60, 'Tempo', 1, 2, '', 1, 4.000, 21);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (61, 'Tempo', 1, 2, '', 1, 6.000, 22);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (71, 'Speed', 2, 4, '', 1, 5.000, 20);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (72, 'Speed', 2, 4, '', 1, 4.000, 21);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (73, 'Speed', 2, 4, '', 1, 6.000, 22);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (74, 'Speed', 2, 4, '', 1, 6.000, 23);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (75, 'Speed', 2, 4, '', 1, 5.000, 24);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (76, 'Speed', 2, 4, '', 1, 7.000, 25);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (77, 'Speed', 2, 4, '', 1, 6.000, 26);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (78, 'Speed', 2, 4, '', 1, 5.000, 27);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (79, 'Speed', 2, 4, '', 1, 3.500, 28);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (80, 'Speed', 2, 5, '', 1, 3.000, 17);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (81, 'Speed', 2, 5, '', 1, 3.000, 18);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (82, 'Speed', 2, 5, '', 1, 3.000, 19);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (83, 'Speed', 2, 5, '', 1, 3.000, 20);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (84, 'Speed', 2, 5, '', 1, 3.000, 21);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (85, 'Speed', 2, 5, '', 1, 3.000, 22);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (86, 'Speed', 2, 5, '', 1, 3.000, 23);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (87, 'Speed', 2, 5, '', 1, 3.000, 24);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (88, 'Speed', 2, 5, '', 1, 3.000, 25);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (89, 'Speed', 2, 5, '', 1, 3.000, 26);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (90, 'Speed', 2, 5, '', 1, 3.000, 27);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (91, 'Long Run', 3, 6, '', 1, 8.000, 17);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (92, 'Long Run', 3, 6, '', 1, 9.000, 18);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (93, 'Long Run', 3, 6, '', 1, 10.000, 19);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (94, 'Long Run', 3, 6, '', 1, 11.000, 20);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (95, 'Long Run', 3, 6, '', 1, 9.000, 21);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (96, 'Long Run', 3, 6, '', 1, 12.000, 22);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (97, 'Long Run', 3, 6, '', 1, 13.000, 23);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (98, 'Long Run', 3, 6, '', 1, 10.000, 24);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (99, 'Long Run', 3, 6, '', 1, 14.000, 25);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (100, 'Long Run', 3, 6, '', 1, 11.000, 26);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (101, 'Long Run', 3, 6, '', 1, 7.000, 27);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (102, 'Long Run', 3, 6, '', 1, 2.000, 28);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (103, 'Mon', 1, 1, '', 1, 3.000, 29);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (104, 'Mon', 1, 1, '', 1, 3.000, 30);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (105, 'Mon', 1, 1, '', 1, 3.000, 31);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (106, 'Mon', 1, 1, '', 1, 3.000, 32);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (107, 'Mon', 1, 1, '', 1, 3.000, 33);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (108, 'Mon', 1, 1, '', 1, 3.000, 34);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (109, 'Mon', 1, 1, '', 1, 3.000, 35);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (110, 'Mon', 1, 1, '', 1, 3.000, 36);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (111, 'Mon', 1, 1, '', 1, 3.000, 37);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (112, 'Mon', 1, 1, '', 1, 3.000, 38);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (113, 'Mon', 1, 1, '', 1, 3.000, 39);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (114, 'Mon', 1, 1, '', 1, 3.000, 40);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (115, 'Mon', 1, 1, '', 1, 3.000, 41);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (116, 'Mon', 1, 1, '', 1, 3.000, 42);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (117, 'Mon', 1, 1, '', 1, 3.000, 43);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (118, 'Mon', 1, 1, '', 1, 3.000, 44);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (119, 'Mon', 1, 1, '', 1, 3.000, 45);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (120, 'Tempo', 1, 2, '', 1, 3.000, 29);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (121, 'Tempo', 1, 2, '', 1, 4.000, 30);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (122, 'Tempo', 1, 2, '', 1, 3.000, 31);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (123, 'Tempo', 1, 2, '', 1, 4.000, 32);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (124, 'Tempo', 1, 2, '', 1, 4.000, 33);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (125, 'Tempo', 1, 2, '', 1, 3.000, 34);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (126, 'Tempo', 1, 2, '', 1, 5.000, 35);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (127, 'Tempo', 1, 2, '', 1, 5.000, 36);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (128, 'Tempo', 1, 2, '', 1, 4.000, 37);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (129, 'Tempo', 1, 2, '', 1, 5.000, 38);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (130, 'Tempo', 1, 2, '', 1, 5.000, 39);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (131, 'Tempo', 1, 2, '', 1, 4.000, 40);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (132, 'Tempo', 1, 2, '', 1, 6.000, 41);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (133, 'Tempo', 1, 2, '', 1, 4.000, 42);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (134, 'Tempo', 1, 2, '', 1, 6.000, 43);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (135, 'Tempo', 1, 2, '', 1, 5.000, 44);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (136, 'Tempo', 1, 2, '', 1, 4.000, 45);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (137, 'Tempo', 1, 2, '', 1, 3.000, 46);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (138, 'Speed', 2, 4, '', 1, 3.100, 29);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (139, 'Speed', 2, 4, '', 1, 4.000, 30);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (140, 'Speed', 2, 4, '', 1, 3.000, 31);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (141, 'Speed', 2, 4, '', 1, 4.000, 32);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (142, 'Speed', 2, 4, '', 1, 4.000, 33);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (143, 'Speed', 2, 4, '', 1, 3.000, 34);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (144, 'Speed', 2, 4, '', 1, 5.000, 35);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (145, 'Speed', 2, 4, '', 1, 5.000, 36);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (146, 'Speed', 2, 4, '', 1, 4.000, 37);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (147, 'Speed', 2, 4, '', 1, 5.000, 38);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (148, 'Speed', 2, 4, '', 1, 5.000, 39);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (149, 'Speed', 2, 4, '', 1, 4.000, 40);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (150, 'Speed', 2, 4, '', 1, 6.000, 41);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (151, 'Speed', 2, 4, '', 1, 4.000, 42);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (152, 'Speed', 2, 4, '', 1, 6.000, 43);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (153, 'Speed', 2, 4, '', 1, 5.000, 44);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (154, 'Speed', 2, 4, '', 1, 4.000, 45);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (155, 'Speed', 2, 4, '', 1, 3.000, 46);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (156, 'Fri', 2, 5, '', 1, 3.000, 29);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (157, 'Fri', 2, 5, '', 1, 3.000, 30);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (158, 'Fri', 2, 5, '', 1, 3.000, 31);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (159, 'Fri', 2, 5, '', 1, 3.000, 32);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (160, 'Fri', 2, 5, '', 1, 3.000, 33);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (161, 'Fri', 2, 5, '', 1, 3.000, 34);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (162, 'Fri', 2, 5, '', 1, 3.000, 35);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (163, 'Fri', 2, 5, '', 1, 3.000, 36);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (164, 'Fri', 2, 5, '', 1, 3.000, 37);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (165, 'Fri', 2, 5, '', 1, 3.000, 38);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (166, 'Fri', 2, 5, '', 1, 3.000, 39);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (167, 'Fri', 2, 5, '', 1, 3.000, 40);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (168, 'Fri', 2, 5, '', 1, 3.000, 41);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (169, 'Fri', 2, 5, '', 1, 3.000, 42);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (170, 'Fri', 2, 5, '', 1, 3.000, 43);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (171, 'Fri', 2, 5, '', 1, 3.000, 44);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (172, 'Fri', 2, 5, '', 1, 3.000, 45);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (173, 'Long Run', 3, 6, '', 1, 6.000, 29);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (174, 'Long Run', 3, 6, '', 1, 7.000, 30);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (175, 'Long Run', 3, 6, '', 1, 5.000, 31);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (176, 'Long Run', 3, 6, '', 1, 9.000, 32);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (177, 'Long Run', 3, 6, '', 1, 10.000, 33);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (178, 'Long Run', 3, 6, '', 1, 7.000, 34);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (179, 'Long Run', 3, 6, '', 1, 12.000, 35);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (180, 'Long Run', 3, 6, '', 1, 13.100, 36);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (181, 'Long Run', 3, 6, '', 1, 10.000, 37);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (182, 'Long Run', 3, 6, '', 1, 15.000, 38);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (183, 'Long Run', 3, 6, '', 1, 16.000, 39);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (184, 'Long Run', 3, 6, '', 1, 12.000, 40);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (185, 'Long Run', 3, 6, '', 1, 18.000, 41);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (186, 'Long Run', 3, 6, '', 1, 14.000, 42);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (187, 'Long Run', 3, 6, '', 1, 20.000, 43);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (188, 'Long Run', 3, 6, '', 1, 12.000, 44);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (189, 'Long Run', 3, 6, '', 1, 8.000, 45);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (190, 'Long Run', 3, 6, '', 1, 3.000, 46);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (191, 'Mon', 1, 1, '', 1, 4.000, 47);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (192, 'Mon', 1, 1, '', 1, 4.000, 48);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (193, 'Mon', 1, 1, '', 1, 4.000, 49);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (194, 'Mon', 1, 1, '', 1, 4.000, 50);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (195, 'Mon', 1, 1, '', 1, 4.000, 51);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (196, 'Mon', 1, 1, '', 1, 4.000, 52);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (197, 'Mon', 1, 1, '', 1, 4.000, 53);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (198, 'Mon', 1, 1, '', 1, 4.000, 54);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (199, 'Mon', 1, 1, '', 1, 4.000, 55);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (200, 'Mon', 1, 1, '', 1, 4.000, 56);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (201, 'Mon', 1, 1, '', 1, 4.000, 57);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (202, 'Mon', 1, 1, '', 1, 4.000, 58);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (203, 'Mon', 1, 1, '', 1, 4.000, 59);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (204, 'Mon', 1, 1, '', 1, 4.000, 60);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (205, 'Mon', 1, 1, '', 1, 4.000, 61);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (206, 'Mon', 1, 1, '', 1, 4.000, 62);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (207, 'Mon', 1, 1, '', 1, 4.000, 63);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (208, 'Tempo', 1, 2, '', 1, 3.000, 47);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (209, 'Tempo', 1, 2, '', 1, 4.000, 48);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (210, 'Tempo', 1, 2, '', 1, 3.000, 49);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (211, 'Tempo', 1, 2, '', 1, 4.000, 50);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (212, 'Tempo', 1, 2, '', 1, 4.000, 51);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (213, 'Tempo', 1, 2, '', 1, 3.500, 52);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (214, 'Tempo', 1, 2, '', 1, 5.000, 53);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (215, 'Tempo', 1, 2, '', 1, 5.000, 54);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (216, 'Tempo', 1, 2, '', 1, 4.000, 55);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (217, 'Tempo', 1, 2, '', 1, 6.000, 56);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (218, 'Tempo', 1, 2, '', 1, 6.000, 57);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (219, 'Tempo', 1, 2, '', 1, 5.000, 58);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (220, 'Tempo', 1, 2, '', 1, 6.500, 59);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (221, 'Tempo', 1, 2, '', 1, 5.000, 60);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (222, 'Tempo', 1, 2, '', 1, 7.000, 61);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (223, 'Tempo', 1, 2, '', 1, 5.500, 62);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (224, 'Tempo', 1, 2, '', 1, 4.000, 63);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (225, 'Tempo', 1, 2, '', 1, 3.500, 64);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (226, 'Speed', 2, 4, '', 1, 3.000, 47);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (227, 'Speed', 2, 4, '', 1, 4.000, 48);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (228, 'Speed', 2, 4, '', 1, 3.000, 49);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (229, 'Speed', 2, 4, '', 1, 4.000, 50);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (230, 'Speed', 2, 4, '', 1, 4.000, 51);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (231, 'Speed', 2, 4, '', 1, 3.500, 52);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (232, 'Speed', 2, 4, '', 1, 5.000, 53);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (233, 'Speed', 2, 4, '', 1, 5.000, 54);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (234, 'Speed', 2, 4, '', 1, 4.000, 55);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (235, 'Speed', 2, 4, '', 1, 6.000, 56);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (236, 'Speed', 2, 4, '', 1, 6.000, 57);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (237, 'Speed', 2, 4, '', 1, 5.000, 58);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (238, 'Speed', 2, 4, '', 1, 6.500, 59);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (239, 'Speed', 2, 4, '', 1, 5.000, 60);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (240, 'Speed', 2, 4, '', 1, 7.000, 61);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (241, 'Speed', 2, 4, '', 1, 5.500, 62);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (242, 'Speed', 2, 4, '', 1, 4.000, 63);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (243, 'Speed', 2, 4, '', 1, 3.500, 64);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (244, 'Fri', 2, 5, '', 1, 4.000, 47);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (245, 'Fri', 2, 5, '', 1, 4.000, 48);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (246, 'Fri', 2, 5, '', 1, 4.000, 49);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (247, 'Fri', 2, 5, '', 1, 4.000, 50);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (248, 'Fri', 2, 5, '', 1, 4.000, 51);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (249, 'Fri', 2, 5, '', 1, 4.000, 52);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (250, 'Fri', 2, 5, '', 1, 4.000, 53);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (251, 'Fri', 2, 5, '', 1, 4.000, 54);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (252, 'Fri', 2, 5, '', 1, 4.000, 55);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (253, 'Fri', 2, 5, '', 1, 4.000, 56);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (254, 'Fri', 2, 5, '', 1, 4.000, 57);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (255, 'Fri', 2, 5, '', 1, 4.000, 58);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (256, 'Fri', 2, 5, '', 1, 4.000, 59);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (257, 'Fri', 2, 5, '', 1, 4.000, 60);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (258, 'Fri', 2, 5, '', 1, 4.000, 61);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (259, 'Fri', 2, 5, '', 1, 4.000, 62);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (260, 'Fri', 2, 5, '', 1, 4.000, 63);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (261, 'Long Run', 3, 6, '', 1, 8.000, 47);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (262, 'Long Run', 3, 6, '', 1, 9.000, 48);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (263, 'Long Run', 3, 6, '', 1, 7.000, 49);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (264, 'Long Run', 3, 6, '', 1, 11.000, 50);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (265, 'Long Run', 3, 6, '', 1, 12.000, 51);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (266, 'Long Run', 3, 6, '', 1, 9.000, 52);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (267, 'Long Run', 3, 6, '', 1, 14.000, 53);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (268, 'Long Run', 3, 6, '', 1, 15.000, 54);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (269, 'Long Run', 3, 6, '', 1, 13.000, 55);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (270, 'Long Run', 3, 6, '', 1, 17.000, 56);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (271, 'Long Run', 3, 6, '', 1, 18.000, 57);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (272, 'Long Run', 3, 6, '', 1, 13.000, 58);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (273, 'Long Run', 3, 6, '', 1, 20.000, 59);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (274, 'Long Run', 3, 6, '', 1, 13.000, 60);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (275, 'Long Run', 3, 6, '', 1, 22.000, 61);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (276, 'Long Run', 3, 6, '', 1, 13.000, 62);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (277, 'Long Run', 3, 6, '', 1, 9.000, 63);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (278, 'Long Run', 3, 6, '', 1, 2.000, 64);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (297, 'Mon', 1, 1, '', 1, 5.000, 66);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (298, 'Mon', 1, 1, '', 1, 5.000, 67);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (299, 'Mon', 1, 1, '', 1, 5.000, 68);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (300, 'Mon', 1, 1, '', 1, 5.000, 69);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (301, 'Mon', 1, 1, '', 1, 5.000, 70);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (302, 'Mon', 1, 1, '', 1, 5.000, 71);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (303, 'Mon', 1, 1, '', 1, 5.000, 72);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (304, 'Mon', 1, 1, '', 1, 5.000, 73);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (305, 'Mon', 1, 1, '', 1, 5.000, 74);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (306, 'Mon', 1, 1, '', 1, 5.000, 75);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (307, 'Mon', 1, 1, '', 1, 5.000, 76);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (308, 'Mon', 1, 1, '', 1, 5.000, 77);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (309, 'Mon', 1, 1, '', 1, 5.000, 78);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (310, 'Mon', 1, 1, '', 1, 5.000, 79);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (311, 'Mon', 1, 1, '', 1, 5.000, 80);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (312, 'Mon', 1, 1, '', 1, 5.000, 81);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (313, 'Mon', 1, 1, '', 1, 5.000, 82);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (314, 'Tempo', 1, 2, '', 1, 4.000, 66);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (315, 'Tempo', 1, 2, '', 1, 5.000, 67);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (316, 'Tempo', 1, 2, '', 1, 4.000, 68);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (317, 'Tempo', 1, 2, '', 1, 5.000, 69);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (318, 'Tempo', 1, 2, '', 1, 5.500, 70);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (319, 'Tempo', 1, 2, '', 1, 5.000, 71);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (320, 'Tempo', 1, 2, '', 1, 6.000, 72);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (321, 'Tempo', 1, 2, '', 1, 6.000, 73);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (322, 'Tempo', 1, 2, '', 1, 5.000, 74);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (323, 'Tempo', 1, 2, '', 1, 7.000, 75);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (324, 'Tempo', 1, 2, '', 1, 7.000, 76);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (325, 'Tempo', 1, 2, '', 1, 6.000, 77);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (326, 'Tempo', 1, 2, '', 1, 7.000, 78);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (327, 'Tempo', 1, 2, '', 1, 6.000, 79);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (328, 'Tempo', 1, 2, '', 1, 8.000, 80);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (329, 'Tempo', 1, 2, '', 1, 6.000, 81);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (330, 'Tempo', 1, 2, '', 1, 5.000, 82);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (331, 'Tempo', 1, 2, '', 1, 3.500, 83);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (332, 'Speed', 2, 4, '', 1, 4.000, 66);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (333, 'Speed', 2, 4, '', 1, 5.000, 67);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (334, 'Speed', 2, 4, '', 1, 4.000, 68);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (335, 'Speed', 2, 4, '', 1, 5.000, 69);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (336, 'Speed', 2, 4, '', 1, 5.500, 70);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (337, 'Speed', 2, 4, '', 1, 5.000, 71);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (338, 'Speed', 2, 4, '', 1, 6.000, 72);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (339, 'Speed', 2, 4, '', 1, 6.000, 73);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (340, 'Speed', 2, 4, '', 1, 5.000, 74);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (341, 'Speed', 2, 4, '', 1, 7.000, 75);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (342, 'Speed', 2, 4, '', 1, 7.000, 76);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (343, 'Speed', 2, 4, '', 1, 6.000, 77);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (344, 'Speed', 2, 4, '', 1, 7.000, 78);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (345, 'Speed', 2, 4, '', 1, 6.000, 79);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (346, 'Speed', 2, 4, '', 1, 8.000, 80);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (347, 'Speed', 2, 4, '', 1, 6.000, 81);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (348, 'Speed', 2, 4, '', 1, 5.000, 82);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (349, 'Speed', 2, 4, '', 1, 3.500, 83);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (350, 'Fri', 2, 5, '', 1, 5.000, 66);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (351, 'Fri', 2, 5, '', 1, 5.000, 67);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (352, 'Fri', 2, 5, '', 1, 5.000, 68);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (353, 'Fri', 2, 5, '', 1, 5.000, 69);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (354, 'Fri', 2, 5, '', 1, 5.000, 70);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (355, 'Fri', 2, 5, '', 1, 5.000, 71);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (356, 'Fri', 2, 5, '', 1, 5.000, 72);
INSERT INTO plan.workout_template (workout_template_id, name, workout_type_id, day_number, description, pace_id, distance, plan_week_template_id) VALUES (357, 'Fri', 2, 5, '', 1, 5.000, 73);


--
-- Name: pace_pace_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.pace_pace_id_seq', 1, true);


--
-- Name: phase_phase_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.phase_phase_id_seq', 1, false);


--
-- Name: plan_plan_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.plan_plan_id_seq', 40, true);


--
-- Name: plan_template_plan_template_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.plan_template_plan_template_id_seq', 1, false);


--
-- Name: plan_week_plan_week_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.plan_week_plan_week_id_seq', 568, true);


--
-- Name: plan_week_template_plan_week_template_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.plan_week_template_plan_week_template_id_seq', 101, true);


--
-- Name: workout_template_workout_template_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.workout_template_workout_template_id_seq', 529, true);


--
-- Name: workout_type_workout_type_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.workout_type_workout_type_id_seq', 4, true);


--
-- Name: workout_worktout_id_seq; Type: SEQUENCE SET; Schema: plan; Owner: birduser
--

SELECT pg_catalog.setval('plan.workout_worktout_id_seq', 1790, true);


--
-- PostgreSQL database dump complete
--

