import mirror from 'mirror-to-object-pairs';

export default mirror([
  'App',
  'Empty',
  'Setting',
  'ProductView',
  'UserProducts',
  'Location',

  // Authentication
  'Auth',

  'Login',
  'Register',
  'RestorePassword',

  // Main App (Tab Navigation)
  'MainApp',

  'Browse',
  'BrowseTab',

  'SavedTab',
  'Saved',

  'InboxTab',
  'Inbox',

  'ProfileTab',
  'Profile',

  'CreatePostModal',
  'CreatePost',
]);
