
INSERT INTO a_role (id, name) VALUES ('ROLE', 'Role management');
INSERT INTO a_role (id, name) VALUES ('GROUP', 'Group management');
INSERT INTO a_role (id, name) VALUES ('USER', 'User management');
INSERT INTO a_role (id, name) VALUES ('SERVICE', 'Service management');
INSERT INTO a_role (id, name) VALUES ('ROUTING', 'Routing management');

INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROLE', 1, 'View');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROLE', 2, 'Update');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROLE', 4, 'Add');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROLE', 8, 'Delete');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROLE', 16, 'Function configuration');

INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('GROUP', 1, 'View');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('GROUP', 2, 'Update');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('GROUP', 4, 'Add');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('GROUP', 8, 'Delete');

INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('USER', 1, 'View');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('USER', 2, 'Update');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('USER', 4, 'Add');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('USER', 8, 'Delete');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('USER', 16, 'Group assignment');

INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROUTING', 1, 'View');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROUTING', 2, 'Update');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROUTING', 4, 'Add');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROUTING', 8, 'Delete');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('ROUTING', 16, 'ROUTING 16');

INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 1, 'View');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 2, 'Update');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 4, 'Add');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 8, 'Delete');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 16, 'Field configuration');
INSERT INTO a_function (role_id, permission_id, permission_name) VALUES ('SERVICE', 32, 'Input Field Configuration');

INSERT INTO a_group (id, name, description) VALUES ('group-superadmin', 'Super Admin Group', 'This group will be asssigned to user \"SuperAdmin\" ');

INSERT INTO a_user (id, full_name, gender, contact_number, email_address, username, password, created_date, status)
VALUES ('superadmin', 'Superadmin', 'male', '', 'superadmin@gmail.com', 'superadmin', '90BBB23D2B633AC4B95BCEE603286E67', 1476845259812, 'ACT');

INSERT INTO a_group_has_user (group_id, user_id) VALUES ('group-superadmin', 'superadmin');

INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'GROUP', 1);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'GROUP', 2);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'GROUP', 4);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'GROUP', 8);

INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROLE', 1);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROLE', 2);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROLE', 4);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROLE', 8);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROLE', 16);

INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'USER', 1);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'USER', 2);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'USER', 4);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'USER', 8);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'USER', 16);

INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROUTING', 1);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROUTING', 2);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROUTING', 4);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROUTING', 8);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'ROUTING', 16);

INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 1);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 2);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 4);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 8);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 16);
INSERT INTO a_group_has_function (group_id, role_id, permission_id) VALUES ('group-superadmin', 'SERVICE', 32);

SELECT * FROM a_role;
SELECT * FROM a_function;
SELECT * FROM a_user;
SELECT * FROM a_group;
SELECT * FROM a_group_has_function;
SELECT * FROM a_group_has_user;