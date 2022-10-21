# EduPay Authentication

User Types:

-   Super Admin (manages the EduPay platform, manage tenants, etc)
-   Tenant Owner (manages tenant admins, billing, etc)
-   Tenant Admin (manages courses, invites teachers, etc)
-   Teacher (manages course(s), sees student lists, uploads materials, sends comms, etc)
-   Student (Enrol in course(s), pay, view schedule, access course materials, comms, etc)

Domains:

-   edupay.test - root domain
-   [tenant].edupay.test - tenant domain

Login:

## Student

-   go to [tenant].edupay.test, login (or do action that requires login)
-   redirected to edupay.test/login for login (accounts exist at top level)
-   post-login redirect back to tenant
-   student-specific menu
-   what about students enrolled in courses in multiple tenants? tenant switcher?
-   students should be able to "sign up" and self-enrol into courses on tenant instances
-   all users can be students

## Teacher

-   go to [tenant].edupay.test/teacher to login as teacher
-   redirected to edupay.test/login for login
-   post-login redirected back to tenant
-   teacher-specific menu
-   teachers can have courses in multiple tenants. tenant switcher?
-   invitation process to invite a teacher to manage a course
-   send teacher email with invite link - create account if none, otherwise link to existing
-   confirmation page to link course to account as a teacher

## Tenant Admin

-   go to [tenant].edupay.test/admin to login as admin
-   redirected to edupay.test/login for login
-   post-login redirected back to tenant
-   tenant admin specific menu
-   tenant admins can technically be a tenant admin in multiple tenants. tenant switcher?
-   tenant admins can also be teachers/students
-   sign up process for creating a tenant. you need to create a user account first.
-   user who signs up becomes tenant owner. Can transfer ownership to another tenant admin.
-   how do we prevent spam/abuse tenant sign ups?
    -   charge money/subscription
    -   manual approval process
    -   link Stripe account
-   tenant owners can add other tenant admins and manage billing?

## Super Admin

-   go to edupay.test/login to login
-   dedicated super admin dashboard for managing tenants etc
-   user impersonation to log in as another user (e.g. tenant owner)
-   managing super admins
