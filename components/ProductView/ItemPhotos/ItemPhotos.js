import React, { useState } from 'react';
import { View, Image } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import notFound from '../../../assets/not-found.png';
import { s } from './styles';

function ItemPhotos({ item }) {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <View>
      {item && !isNotFound ? (
        <View>
          <Image source={{ uri: item }} style={s.photos} />
          <Image
            source={notFound}
            style={[s.photosNotFound, s.absoluteNotFound]}
            onError={() => setIsNotFound(true)}
          />
        </View>
      ) : (
        <Image source={notFound} style={s.photosNotFound} />
      )}
    </View>
  );
}

ItemPhotos.propTypes = {
  item: T.string,
};

export default observer(ItemPhotos);
