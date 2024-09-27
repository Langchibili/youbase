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
    province: Attribute.Enumeration<
      [
        'Central',
        'Copperbelt',
        'Eastern',
        'Luapula',
        'Lusaka',
        'Muchinga',
        'North-Western',
        'Northern',
        'Southern',
        'Western',
        'other'
      ]
    > &
      Attribute.DefaultTo<'other'>;
    city: Attribute.Enumeration<
      [
        'Lusaka',
        'Ndola',
        'Kitwe',
        'Kabwe',
        'Chingola',
        'Mufulira',
        'Livingstone',
        'Luanshya',
        'Chipata',
        'Chililabombwe',
        'Kafue',
        'Kalulushi',
        'Mazabuka',
        'Mansa',
        'Solwezi',
        'Choma',
        'Mongu',
        'Kasama',
        'Mpika',
        'Sesheke',
        'Kapiri Mposhi',
        'Nakonde',
        'Kawambwa',
        'Petauke',
        'Samfya',
        'Kalabo',
        'Siavonga',
        'Lundazi',
        'Mwinilunga',
        'Kaoma',
        'Chirundu',
        'Kabompo',
        'Isoka',
        'Mumbwa',
        'Monze',
        'other'
      ]
    > &
      Attribute.DefaultTo<'other'>;
  };
}

export interface UserProfileSocials extends Schema.Component {
  collectionName: 'components_user_profile_socials';
  info: {
    displayName: 'socials';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    x: Attribute.String;
    tiktok: Attribute.String;
    youtube: Attribute.String;
    telegram: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'user-profile.details': UserProfileDetails;
      'user-profile.socials': UserProfileSocials;
    }
  }
}
