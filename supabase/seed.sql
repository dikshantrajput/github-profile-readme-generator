-- Seed data for workspaces
INSERT INTO base.workspaces (name, slug, extra_data) VALUES
('Acme Corporation', 'acme-corp', '{"industry": "Technology", "size": "Enterprise"}'),
('Startup Innovators', 'startup-innovators', '{"industry": "Various", "size": "Small"}'),
('Green Energy Solutions', 'green-energy', '{"industry": "Renewable Energy", "size": "Medium"}');

-- Seed data for users
INSERT INTO base.users (email, extra_data) VALUES
('john.doe@example.com', '{"first_name": "John", "last_name": "Doe", "role": "Developer"}'),
('jane.smith@example.com', '{"first_name": "Jane", "last_name": "Smith", "role": "Designer"}'),
('alice.johnson@example.com', '{"first_name": "Alice", "last_name": "Johnson", "role": "Manager"}'),
('bob.williams@example.com', '{"first_name": "Bob", "last_name": "Williams", "role": "Analyst"}');

-- Seed data for workspace_users
INSERT INTO base.workspace_users (workspace_id, user_id, extra_data)
SELECT w.id, u.id, '{"joined_date": "2024-07-10"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'acme-corp' AND u.email IN ('john.doe@example.com', 'jane.smith@example.com');

INSERT INTO base.workspace_users (workspace_id, user_id, extra_data)
SELECT w.id, u.id, '{"joined_date": "2024-07-10"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'startup-innovators' AND u.email IN ('alice.johnson@example.com', 'bob.williams@example.com');

INSERT INTO base.workspace_users (workspace_id, user_id, extra_data)
SELECT w.id, u.id, '{"joined_date": "2024-07-10"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'green-energy' AND u.email = 'jane.smith@example.com';

-- Seed data for workspace_user_permissions
INSERT INTO base.workspace_user_permissions (workspace_id, user_id, permissions)
SELECT w.id, u.id, '{"users.read","users.create"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'acme-corp' AND u.email = 'john.doe@example.com';

INSERT INTO base.workspace_user_permissions (workspace_id, user_id, permissions)
SELECT w.id, u.id, '{"users.read","users.create"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'acme-corp' AND u.email = 'jane.smith@example.com';

INSERT INTO base.workspace_user_permissions (workspace_id, user_id, permissions)
SELECT w.id, u.id, '{"users.read","users.create"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'startup-innovators' AND u.email = 'alice.johnson@example.com';

INSERT INTO base.workspace_user_permissions (workspace_id, user_id, permissions)
SELECT w.id, u.id, '{"users.read","users.create"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'startup-innovators' AND u.email = 'bob.williams@example.com';

INSERT INTO base.workspace_user_permissions (workspace_id, user_id, permissions)
SELECT w.id, u.id, '{"users.read","users.create"}'
FROM base.workspaces w, base.users u
WHERE w.slug = 'green-energy' AND u.email = 'jane.smith@example.com';

-- Seed data for workspace_resource_usage
INSERT INTO base.workspace_resource_usage (workspace_id, storage_used, api_calls_count)
SELECT id, 
       CASE 
         WHEN slug = 'acme-corp' THEN 5000
         WHEN slug = 'startup-innovators' THEN 1000
         WHEN slug = 'green-energy' THEN 2500
       END,
       CASE 
         WHEN slug = 'acme-corp' THEN 10000
         WHEN slug = 'startup-innovators' THEN 5000
         WHEN slug = 'green-energy' THEN 7500
       END
FROM base.workspaces;