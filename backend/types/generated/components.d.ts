import type { Schema, Attribute } from '@strapi/strapi';

export interface UserProfileDetails extends Schema.Component {
  collectionName: 'components_user_profile_details';
  info: {
    displayName: 'details';
    description: '';
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    about: Attribute.Text;
    age: Attribute.String;
    gender: Attribute.Enumeration<['male', 'female', 'other']> &
      Attribute.DefaultTo<'other'>;
    phoneNumber: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'user-profile.details': UserProfileDetails;
    }
  }
}
