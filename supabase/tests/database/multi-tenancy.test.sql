-- Start transaction and plan the tests
BEGIN;

SELECT plan(55);

-- Test for schema existence
SELECT has_schema('base', 'Schema "base" should exist');

-- Test workspaces table
SELECT has_table('base', 'workspaces', 'Table base.workspaces should exist');
SELECT has_column('base', 'workspaces', 'id', 'workspaces should have id column');
SELECT has_column('base', 'workspaces', 'name', 'workspaces should have name column');
SELECT has_column('base', 'workspaces', 'slug', 'workspaces should have slug column');
SELECT has_column('base', 'workspaces', 'extra_data', 'workspaces should have extra_data column');
SELECT has_column('base', 'workspaces', 'created_at', 'workspaces should have created_at column');
SELECT has_column('base', 'workspaces', 'updated_at', 'workspaces should have updated_at column');
SELECT col_is_pk('base', 'workspaces', 'id', 'id should be the primary key for workspaces');
SELECT col_is_unique('base', 'workspaces', 'slug', 'slug should be unique in workspaces');

-- Test users table
SELECT has_table('base', 'users', 'Table base.users should exist');
SELECT has_column('base', 'users', 'id', 'users should have id column');
SELECT has_column('base', 'users', 'email', 'users should have email column');
SELECT has_column('base', 'users', 'extra_data', 'users should have extra_data column');
SELECT has_column('base', 'users', 'created_at', 'users should have created_at column');
SELECT has_column('base', 'users', 'updated_at', 'users should have updated_at column');
SELECT col_is_pk('base', 'users', 'id', 'id should be the primary key for users');
SELECT col_is_unique('base', 'users', 'email', 'email should be unique in users');

-- Test workspace_users table
SELECT has_table('base', 'workspace_users', 'Table base.workspace_users should exist');
SELECT has_column('base', 'workspace_users', 'id', 'workspace_users should have id column');
SELECT has_column('base', 'workspace_users', 'workspace_id', 'workspace_users should have workspace_id column');
SELECT has_column('base', 'workspace_users', 'user_id', 'workspace_users should have user_id column');
SELECT has_column('base', 'workspace_users', 'extra_data', 'workspace_users should have extra_data column');
SELECT has_column('base', 'workspace_users', 'created_at', 'workspace_users should have created_at column');
SELECT has_column('base', 'workspace_users', 'updated_at', 'workspace_users should have updated_at column');
SELECT col_is_pk('base', 'workspace_users', 'id', 'id should be the primary key for workspace_users');
SELECT fk_ok('base', 'workspace_users', 'workspace_id', 'base', 'workspaces', 'id');
SELECT fk_ok('base', 'workspace_users', 'user_id', 'base', 'users', 'id');

-- Test workspace_user_permissions table
SELECT has_table('base', 'workspace_user_permissions', 'Table base.workspace_user_permissions should exist');
SELECT has_column('base', 'workspace_user_permissions', 'id', 'workspace_user_permissions should have id column');
SELECT has_column('base', 'workspace_user_permissions', 'workspace_id', 'workspace_user_permissions should have workspace_id column');
SELECT has_column('base', 'workspace_user_permissions', 'user_id', 'workspace_user_permissions should have user_id column');
SELECT has_column('base', 'workspace_user_permissions', 'permissions', 'workspace_user_permissions should have permissions column');
SELECT col_is_pk('base', 'workspace_user_permissions', 'id', 'id should be the primary key for workspace_user_permissions');
SELECT fk_ok('base', 'workspace_user_permissions', 'workspace_id', 'base', 'workspaces', 'id');
SELECT fk_ok('base', 'workspace_user_permissions', 'user_id', 'base', 'users', 'id');

-- Test workspace_resource_usage table
SELECT has_table('base', 'workspace_resource_usage', 'Table base.workspace_resource_usage should exist');
SELECT has_column('base', 'workspace_resource_usage', 'id', 'workspace_resource_usage should have id column');
SELECT has_column('base', 'workspace_resource_usage', 'workspace_id', 'workspace_resource_usage should have workspace_id column');
SELECT has_column('base', 'workspace_resource_usage', 'storage_used', 'workspace_resource_usage should have storage_used column');
SELECT has_column('base', 'workspace_resource_usage', 'api_calls_count', 'workspace_resource_usage should have api_calls_count column');
SELECT has_column('base', 'workspace_resource_usage', 'created_at', 'workspace_resource_usage should have created_at column');
SELECT has_column('base', 'workspace_resource_usage', 'updated_at', 'workspace_resource_usage should have updated_at column');
SELECT col_is_pk('base', 'workspace_resource_usage', 'id', 'id should be the primary key for workspace_resource_usage');
SELECT fk_ok('base', 'workspace_resource_usage', 'workspace_id', 'base', 'workspaces', 'id');

-- Test for seeded data
SELECT is(
    (SELECT COUNT(*) FROM base.workspaces),
    3::bigint,
    'There should be 3 workspaces'
);

SELECT is(
    (SELECT COUNT(*) FROM base.users),
    4::bigint,
    'There should be 4 users'
);

SELECT is(
    (SELECT COUNT(*) FROM base.workspace_users),
    5::bigint,
    'There should be 5 workspace_user associations'
);

SELECT is(
    (SELECT COUNT(*) FROM base.workspace_user_permissions),
    5::bigint,
    'There should be 5 workspace_user_permissions entries'
);

SELECT is(
    (SELECT COUNT(*) FROM base.workspace_resource_usage),
    3::bigint,
    'There should be 3 workspace_resource_usage entries'
);

-- Test specific data entries
SELECT ok(
    EXISTS(SELECT 1 FROM base.workspaces WHERE name = 'Acme Corporation' AND slug = 'acme-corp'),
    'Acme Corporation workspace should exist'
);

SELECT ok(
    EXISTS(SELECT 1 FROM base.users WHERE email = 'john.doe@example.com'),
    'User John Doe should exist'
);

SELECT ok(
    EXISTS(
        SELECT 1 
        FROM base.workspace_users wu
        JOIN base.workspaces w ON wu.workspace_id = w.id
        JOIN base.users u ON wu.user_id = u.id
        WHERE w.slug = 'acme-corp' AND u.email = 'john.doe@example.com'
    ),
    'John Doe should be associated with Acme Corporation workspace'
);

SELECT ok(
    EXISTS(
        SELECT 1 
        FROM base.workspace_user_permissions wup
        JOIN base.workspaces w ON wup.workspace_id = w.id
        JOIN base.users u ON wup.user_id = u.id
        WHERE w.slug = 'acme-corp' AND u.email = 'john.doe@example.com'
        AND wup.permissions->>'admin' = 'true'
    ),
    'John Doe should have admin permissions in Acme Corporation workspace'
);

SELECT ok(
    EXISTS(
        SELECT 1 
        FROM base.workspace_resource_usage wru
        JOIN base.workspaces w ON wru.workspace_id = w.id
        WHERE w.slug = 'acme-corp' AND wru.storage_used = 5000 AND wru.api_calls_count = 10000
    ),
    'Acme Corporation should have correct resource usage'
);

-- Finish the tests and clean up
SELECT * FROM finish();
ROLLBACK;