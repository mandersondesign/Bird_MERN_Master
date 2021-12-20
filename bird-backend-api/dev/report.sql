SELECT
       u.user_id as "User ID",
       u.name as "First Name",
       u.last_name as "Last Name",
       ut.name as "User Type",
       u.email as "Email",
       u.phone as "Phone",
       date(u.created_at) as "Creating date",
       case when u.is_active THEN 'YES' else 'NO' end AS "Active",
       count(coach_plan.plan_id) AS "Acitve Athletes Amount (for coach)",
       CASE WHEN
           count(athlete_plan.plan_id) = 0
           THEN 'NO'  else 'YES'
        end AS "Active plan (for athlete)"
FROM "user"."user" u
INNER JOIN "user".user_type ut USING (user_type_id)
LEFT JOIN plan.plan coach_plan ON (coach_plan.coach_id = u.user_id AND coach_plan.is_active)
LEFT JOIN plan.plan athlete_plan ON (athlete_plan.athlete_id = u.user_id AND athlete_plan.is_active)
WHERE u.user_type_id != 1 and u.is_active
GROUP BY u.user_id, ut.user_type_id
ORDER BY u.created_at DESC