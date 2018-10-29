import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { NavigationPage } from './components/actionsUI/NavigationPage.js';

export class LocksPage extends React.Component {
  constructor(props) {
    super(props);
    
    let locks = [];
    if (typeof props.locks == "function") {
      let curLocks = props.locks();
      
      curLocks.forEach((lock, index) => {
        if (typeof lock.nickname == "string") {
          locks.push(lock.nickname);
        } else if (typeof lock.code == "string" ){
          locks.push(lock.code);
        } else {
          locks.push("Lock " + index);
        }
      });
    }
    this.state = {
      locks,
    };
  }
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.locks.container}>
          <FlatList data={this.state.locks}
                    render={({item}) => <Text style={styles.pages.locks.lockList}>{item}</Text>} />
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    locks: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      lockList: {
        fontSize: 18,
      },
    },
  },
});
