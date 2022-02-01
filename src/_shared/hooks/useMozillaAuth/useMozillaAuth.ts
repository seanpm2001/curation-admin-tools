import { AuthService, useAuth as pkceUseAuth } from 'react-oauth2-pkce';

/**
 * A helper interface that contains what is available to us to use in the application
 */
export interface IDToken {
  given_name: string;
  family_name: string;
  name: string;
  email: string;
  'cognito:groups': string[];
  'cognito:username': string;
  'custom:groups': string;
  groups: string[];
  picture: string;
  exp: number;
  iat: number;
  email_verified: string;
}

/**
 * A handy hook to expand on the pkce auth hook to include some Pocket specific helpers
 *
 */
export const useMozillaAuth = (): {
  authService: AuthService;
  parsedIdToken: IDToken;
  canAccessCollections: boolean;
  canAccessCuration: boolean;
} => {
  const { authService } = pkceUseAuth();
  const parsedIdToken = authService.getUser() as IDToken;

  //We need to custom parse out groups if they exist
  parsedIdToken.groups =
    'custom:groups' in parsedIdToken
      ? JSON.parse(parsedIdToken['custom:groups'])
      : [];

  return {
    authService,
    parsedIdToken,
    //TODO: Setup mozillians.org groups
    canAccessCollections: true, //parsedIdToken.groups.includes('asd'),
    canAccessCuration: true, //parsedIdToken.groups.includes('asd'),
  };
};
