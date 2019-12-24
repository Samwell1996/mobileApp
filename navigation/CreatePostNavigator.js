import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import CreatePostModal from '../screens/CreatePost/CreatePostScreen';

const CreatePostNavigator = createStackNavigator({
    [screens.CreatePost]: CreatePostModal,
  },
  {
    headerLayoutPreset: 'center',
  },
);

export default CreatePostNavigator;
