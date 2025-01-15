import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    type: Attribute.Enumeration<['default', 'loggedin']> &
      Attribute.DefaultTo<'default'>;
    loggedInUserType: Attribute.Enumeration<
      ['default', 'artist', 'streamer', 'podcaster', 'ad_creator']
    > &
      Attribute.DefaultTo<'default'>;
    follows: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    following: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::post.post'
    >;
    comments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::comment.comment'
    >;
    ads: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ad.ad'
    >;
    authType: Attribute.Enumeration<['local', 'google', 'facebook']> &
      Attribute.DefaultTo<'local'>;
    connectedAccounts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    parentAccount: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    engagements: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::engagement.engagement'
    >;
    extra_payload: Attribute.JSON;
    likedPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::post.post'
    >;
    sharedPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::post.post'
    >;
    viewedPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::post.post'
    >;
    playedPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::post.post'
    >;
    seenPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::post.post'
    >;
    profilePicture: Attribute.Media;
    details: Attribute.Component<'user-profile.details'>;
    followersCount: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    postsCount: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    followingCount: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    activity: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::notification.notification'
    >;
    notifications: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::notification.notification'
    >;
    notificationsCount: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    seenNotifications: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::notification.notification'
    >;
    socials: Attribute.Component<'user-profile.socials'>;
    reportedPosts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::reported-post.reported-post'
    >;
    verified: Attribute.Boolean;
    status: Attribute.Enumeration<['published', 'draft']>;
    notificationsDeviceId: Attribute.String;
    accountBlocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    likes: Attribute.BigInteger;
    shares: Attribute.BigInteger;
    views: Attribute.BigInteger;
    plays: Attribute.BigInteger;
    commentsCount: Attribute.BigInteger;
    totalEngagement: Attribute.BigInteger;
    impressions: Attribute.BigInteger;
    monetized: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdAd extends Schema.CollectionType {
  collectionName: 'ads';
  info: {
    singularName: 'ad';
    pluralName: 'ads';
    displayName: 'Ad';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.Enumeration<['text', 'image', 'music', 'video']> &
      Attribute.DefaultTo<'text'>;
    adCreator: Attribute.Relation<
      'api::ad.ad',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    description: Attribute.Text;
    adFormat: Attribute.Enumeration<
      ['banner', 'strip', 'slider', 'list', 'grid']
    > &
      Attribute.DefaultTo<'banner'>;
    engagements: Attribute.Relation<
      'api::ad.ad',
      'oneToMany',
      'api::engagement.engagement'
    >;
    media: Attribute.Media;
    mediaType: Attribute.Enumeration<['single', 'multiple']> &
      Attribute.DefaultTo<'single'>;
    impressions: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    clicks: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    userId: Attribute.String;
    extra_payload: Attribute.JSON;
    categories: Attribute.Relation<
      'api::ad.ad',
      'manyToMany',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::ad.ad', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::ad.ad', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAppFeatureAppFeature extends Schema.CollectionType {
  collectionName: 'app_features';
  info: {
    singularName: 'app-feature';
    pluralName: 'app-features';
    displayName: 'AppFeature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    about_feature: Attribute.RichText & Attribute.Private;
    status: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-feature.app-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-feature.app-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArtistArtist extends Schema.SingleType {
  collectionName: 'artists';
  info: {
    singularName: 'artist';
    pluralName: 'artists';
    displayName: 'artists';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    zambian: Attribute.JSON;
    zimbabwean: Attribute.JSON;
    tanzanian: Attribute.JSON;
    malawian: Attribute.JSON;
    southafrican: Attribute.JSON;
    nigerian: Attribute.JSON;
    international: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::artist.artist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::artist.artist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthAuth extends Schema.CollectionType {
  collectionName: 'auths';
  info: {
    singularName: 'auth';
    pluralName: 'auths';
    displayName: 'auth';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    otp: Attribute.String;
    phone_number: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBugReportBugReport extends Schema.CollectionType {
  collectionName: 'bug_reports';
  info: {
    singularName: 'bug-report';
    pluralName: 'bug-reports';
    displayName: 'bugReports';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    location: Attribute.String;
    error_data: Attribute.Text;
    user: Attribute.Relation<
      'api::bug-report.bug-report',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bug-report.bug-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bug-report.bug-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    childCategories: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::category.category'
    >;
    parentCategories: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::category.category'
    >;
    categoryName: Attribute.String;
    posts: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryNameCategoryName extends Schema.SingleType {
  collectionName: 'category_names';
  info: {
    singularName: 'category-name';
    pluralName: 'category-names';
    displayName: 'CategoryNames';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CategoryNamesList: Attribute.JSON;
    videosCategories: Attribute.JSON;
    musicCategories: Attribute.JSON;
    imageCategories: Attribute.JSON;
    textCategories: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category-name.category-name',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category-name.category-name',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCheckEngagementCheckEngagement
  extends Schema.CollectionType {
  collectionName: 'check_engagements';
  info: {
    singularName: 'check-engagement';
    pluralName: 'check-engagements';
    displayName: 'checkEngagement';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutRoute: Attribute.Blocks & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::check-engagement.check-engagement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::check-engagement.check-engagement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCheckUserFollowingCheckUserFollowing
  extends Schema.CollectionType {
  collectionName: 'check_user_followings';
  info: {
    singularName: 'check-user-following';
    pluralName: 'check-user-followings';
    displayName: 'checkUserFollowing';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutRoute: Attribute.Blocks & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::check-user-following.check-user-following',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::check-user-following.check-user-following',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCommentComment extends Schema.CollectionType {
  collectionName: 'comments';
  info: {
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    text: Attribute.Text;
    post: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::post.post'
    >;
    user: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    type: Attribute.Enumeration<
      ['text', 'image', 'audio', 'video', 'emoji', 'sticker']
    > &
      Attribute.DefaultTo<'text'>;
    replies: Attribute.Relation<
      'api::comment.comment',
      'oneToMany',
      'api::comment.comment'
    >;
    parentComment: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::comment.comment'
    >;
    media: Attribute.Media;
    postId: Attribute.String;
    userId: Attribute.String;
    extra_payload: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContentContent extends Schema.CollectionType {
  collectionName: 'contents';
  info: {
    singularName: 'content';
    pluralName: 'contents';
    displayName: 'content';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.Enumeration<['text', 'image', 'music', 'video', 'embed']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::content.content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::content.content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEngagementEngagement extends Schema.CollectionType {
  collectionName: 'engagements';
  info: {
    singularName: 'engagement';
    pluralName: 'engagements';
    displayName: 'Engagement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.Enumeration<
      ['like', 'view', 'play', 'share', 'impression', 'clicks']
    > &
      Attribute.Required;
    postType: Attribute.Enumeration<['content', 'ad']> &
      Attribute.DefaultTo<'content'>;
    post: Attribute.Relation<
      'api::engagement.engagement',
      'manyToOne',
      'api::post.post'
    >;
    ad: Attribute.Relation<
      'api::engagement.engagement',
      'manyToOne',
      'api::ad.ad'
    >;
    users: Attribute.Relation<
      'api::engagement.engagement',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    userId: Attribute.String;
    postId: Attribute.String;
    extra_payload: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::engagement.engagement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::engagement.engagement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFilteredUserFilteredUser extends Schema.CollectionType {
  collectionName: 'filtered_users';
  info: {
    singularName: 'filtered-user';
    pluralName: 'filtered-users';
    displayName: 'filteredUsers';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutRoute: Attribute.Blocks & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::filtered-user.filtered-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::filtered-user.filtered-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFirebaseFcmConfigFirebaseFcmConfig
  extends Schema.SingleType {
  collectionName: 'firebase_fcm_configs';
  info: {
    singularName: 'firebase-fcm-config';
    pluralName: 'firebase-fcm-configs';
    displayName: 'firebaseFcmConfig';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceAccount: Attribute.JSON;
    adminUserIds: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::firebase-fcm-config.firebase-fcm-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::firebase-fcm-config.firebase-fcm-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMediaConvertJobMediaConvertJob
  extends Schema.CollectionType {
  collectionName: 'media_convert_jobs';
  info: {
    singularName: 'media-convert-job';
    pluralName: 'media-convert-jobs';
    displayName: 'MediaConvertJobs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    jobId: Attribute.String;
    resolution: Attribute.Enumeration<
      ['res-1080', 'res-720', 'res-480', 'res-360', 'res-240']
    >;
    uploadId: Attribute.String;
    type: Attribute.Enumeration<['video', 'image']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-convert-job.media-convert-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::media-convert-job.media-convert-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications';
  info: {
    singularName: 'notification';
    pluralName: 'notifications';
    displayName: 'Notification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    type: Attribute.Enumeration<['post', 'user', 'system']> &
      Attribute.DefaultTo<'post'>;
    notifier: Attribute.Relation<
      'api::notification.notification',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    notifiedUsers: Attribute.Relation<
      'api::notification.notification',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    post: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'api::post.post'
    >;
    status: Attribute.Enumeration<['seen', 'unseen']> &
      Attribute.DefaultTo<'unseen'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationsDeviceIdNotificationsDeviceId
  extends Schema.SingleType {
  collectionName: 'notifications_device_ids';
  info: {
    singularName: 'notifications-device-id';
    pluralName: 'notifications-device-ids';
    displayName: 'notificationsDeviceIds';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    deviceIds: Attribute.JSON;
    adminDeviceIds: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notifications-device-id.notifications-device-id',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notifications-device-id.notifications-device-id',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlaylistPlaylist extends Schema.CollectionType {
  collectionName: 'playlists';
  info: {
    singularName: 'playlist';
    pluralName: 'playlists';
    displayName: 'Playlist';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    type: Attribute.Enumeration<['music', 'video']> &
      Attribute.DefaultTo<'music'>;
    posts: Attribute.Relation<
      'api::playlist.playlist',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::playlist.playlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::playlist.playlist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.DefaultTo<'untitled'>;
    user: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    description: Attribute.Text;
    engagements: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::engagement.engagement'
    >;
    comments: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::comment.comment'
    >;
    type: Attribute.Enumeration<['text', 'image', 'music', 'video', 'embed']> &
      Attribute.DefaultTo<'text'>;
    media: Attribute.Media;
    mediaType: Attribute.Enumeration<['single', 'multiple']> &
      Attribute.DefaultTo<'single'>;
    parentPost: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::post.post'
    >;
    rePosts: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >;
    featuredImages: Attribute.Media;
    likes: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    views: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    plays: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    shares: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    userId: Attribute.String;
    mediaSource: Attribute.Enumeration<
      ['local', 'youtube', 'facebook', 'tiktok', 'twitter']
    > &
      Attribute.DefaultTo<'local'>;
    extra_payload: Attribute.JSON;
    playlists: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'api::playlist.playlist'
    >;
    dashed_title: Attribute.String;
    is_title_user_writted: Attribute.Boolean & Attribute.DefaultTo<false>;
    impressions: Attribute.BigInteger & Attribute.DefaultTo<'0'>;
    postLikedBy: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    postSharedBy: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    postViewedBy: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    postPlayedBy: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    postSeenBy: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    status: Attribute.Enumeration<['published', 'draft']> &
      Attribute.DefaultTo<'draft'>;
    embedLink: Attribute.String;
    mediaDisplayType: Attribute.Enumeration<['portrait', 'landscape']>;
    reports: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::reported-post.reported-post'
    >;
    categories: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'api::category.category'
    >;
    commentsCount: Attribute.BigInteger;
    totalEngagement: Attribute.BigInteger;
    monetized: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiReportReasonReportReason extends Schema.SingleType {
  collectionName: 'report_reasons';
  info: {
    singularName: 'report-reason';
    pluralName: 'report-reasons';
    displayName: 'reportReason';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    reasons: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::report-reason.report-reason',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::report-reason.report-reason',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReportedPostReportedPost extends Schema.CollectionType {
  collectionName: 'reported_posts';
  info: {
    singularName: 'reported-post';
    pluralName: 'reported-posts';
    displayName: 'ReportedPost';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    reason: Attribute.Enumeration<
      [
        'Spam: Posts that are unsolicited advertisements or irrelevant promotional content.',
        'Hate Speech: Content that promotes hatred or violence against individuals or groups based on attributes such as race, ethnicity, nationality, religion, gender, sexual orientation, or disability.',
        'Harassment or Bullying: Posts that target individuals with harmful, threatening, or abusive messages.',
        'Graphic Violence: Content that depicts extreme violence, gore, or harm to individuals or animals.',
        'Nudity or Sexual Content: Posts that contain explicit sexual content, nudity, or sexualized imagery that violates community guidelines.',
        'Misinformation: Sharing false or misleading information, especially regarding health, safety, politics, or public events.',
        'Impersonation: Accounts or posts that falsely represent someone else, including celebrities or public figures.',
        'Self-Harm or Suicide Promotion: Content that encourages or glorifies self-harm, suicide, or other dangerous behavior.',
        'Illegal Activity: Posts that promote or depict illegal activities, such as drug use, trafficking, or other criminal acts.',
        'Child Exploitation: Any content that involves the exploitation or abuse of minors.',
        'Intellectual Property Violation: Content that infringes on copyrights, trademarks, or other intellectual property rights.',
        'Inappropriate Content: Posts that contain inappropriate language, images, or topics that are not suitable for all audiences.',
        'Trolling: Content intended to provoke or upset others without genuine intent for discussion.',
        'False Claims: Posts that make baseless accusations or spread conspiracy theories without credible evidence.',
        "Community Guidelines Violation: Any other behavior or content that breaches the platform's specific community guidelines.",
        'other'
      ]
    >;
    reasonBody: Attribute.Text;
    reportedPostUser: Attribute.Relation<
      'api::reported-post.reported-post',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    post: Attribute.Relation<
      'api::reported-post.reported-post',
      'manyToOne',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reported-post.reported-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reported-post.reported-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSendFcMnotificationSendFcMnotification
  extends Schema.CollectionType {
  collectionName: 'send_fc_mnotifications';
  info: {
    singularName: 'send-fc-mnotification';
    pluralName: 'send-fc-mnotifications';
    displayName: 'sendFCMnotification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text;
    image_path: Attribute.String;
    payload: Attribute.JSON;
    targetUserIds: Attribute.JSON;
    clickAction: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::send-fc-mnotification.send-fc-mnotification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::send-fc-mnotification.send-fc-mnotification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupportSupport extends Schema.CollectionType {
  collectionName: 'supports';
  info: {
    singularName: 'support';
    pluralName: 'supports';
    displayName: 'support';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    body: Attribute.Text;
    phoneNumber: Attribute.String;
    email: Attribute.String;
    fullnames: Attribute.String;
    issue: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support.support',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support.support',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupportIssueSupportIssue extends Schema.SingleType {
  collectionName: 'support_issues';
  info: {
    singularName: 'support-issue';
    pluralName: 'support-issues';
    displayName: 'supportIssues';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    issues: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support-issue.support-issue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support-issue.support-issue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserFeedUserFeed extends Schema.CollectionType {
  collectionName: 'get_user_feed';
  info: {
    singularName: 'user-feed';
    pluralName: 'get-user-feed';
    displayName: 'getUserFeed';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutRoute: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-feed.user-feed',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-feed.user-feed',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::ad.ad': ApiAdAd;
      'api::app-feature.app-feature': ApiAppFeatureAppFeature;
      'api::artist.artist': ApiArtistArtist;
      'api::auth.auth': ApiAuthAuth;
      'api::bug-report.bug-report': ApiBugReportBugReport;
      'api::category.category': ApiCategoryCategory;
      'api::category-name.category-name': ApiCategoryNameCategoryName;
      'api::check-engagement.check-engagement': ApiCheckEngagementCheckEngagement;
      'api::check-user-following.check-user-following': ApiCheckUserFollowingCheckUserFollowing;
      'api::comment.comment': ApiCommentComment;
      'api::content.content': ApiContentContent;
      'api::engagement.engagement': ApiEngagementEngagement;
      'api::filtered-user.filtered-user': ApiFilteredUserFilteredUser;
      'api::firebase-fcm-config.firebase-fcm-config': ApiFirebaseFcmConfigFirebaseFcmConfig;
      'api::media-convert-job.media-convert-job': ApiMediaConvertJobMediaConvertJob;
      'api::notification.notification': ApiNotificationNotification;
      'api::notifications-device-id.notifications-device-id': ApiNotificationsDeviceIdNotificationsDeviceId;
      'api::playlist.playlist': ApiPlaylistPlaylist;
      'api::post.post': ApiPostPost;
      'api::report-reason.report-reason': ApiReportReasonReportReason;
      'api::reported-post.reported-post': ApiReportedPostReportedPost;
      'api::send-fc-mnotification.send-fc-mnotification': ApiSendFcMnotificationSendFcMnotification;
      'api::support.support': ApiSupportSupport;
      'api::support-issue.support-issue': ApiSupportIssueSupportIssue;
      'api::user-feed.user-feed': ApiUserFeedUserFeed;
    }
  }
}
