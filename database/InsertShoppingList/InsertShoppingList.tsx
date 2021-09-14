import * as React from "react";
import SQLite from 'react-native-sqlite-storage';

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class InsertShoppingList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }
    
    componentWillUnmount() {
    //   sqlDb.close();

    }
  
  
    //function to add shopping list to the db
    insertShoppingListToDb = (id: string, title: string, items: ContentModel[], isMeal: boolean) => new Promise((resolve, reject) => {
      const sqlDb = SQLite.openDatabase(
        {
          name: 'ShoppingList.db',
          location: 'default',
          createFromLocation: 2,
        },
        () => {
          // Alert.alert('Connected with success!');
          console.log("DB connected");
        },
        (error: any) => {
          console.log("CreateNewShoppingList db error", error);
        }
      );
  
      const shoppingListQuery = "INSERT INTO ShoppingList (id, title, isMeal) values (?,?,?)";
      // INSERT INTO ShoppingList(id, title, items, isMeal) values ("testId2","testTitle2","testItems2",0)
      // const query = "SELECT * FROM ";
      const shoppingListparams = [id, title, isMeal];
  
      sqlDb.transaction(tx => {
        tx.executeSql(shoppingListQuery, shoppingListparams, (tx, results) => {
          console.log("inserted into shopping list table");
          // console.log("results",results);
          // Alert.alert('Success', 'Shopping List was saved.');
          this.insertListItemsToDb(sqlDb,id, items);
        },
          (tx, err) => {
            // Alert.alert('Error', 'Shopping List was not saved.');
            console.log('Inserting into shopping list table error', err, tx)
          });
      });
    });
  
    //function to add shopping list items to the db with shopping list association
    insertListItemsToDb = (sqlDb: SQLite.SQLiteDatabase, shoppingListId: string, items: ContentModel[]) => new Promise((resolve, reject) => {
  
      const listItemQuery = "INSERT INTO ListItem (id, name, qty, shoppingListId) values (?,?,?,?)";
  
      items.forEach(x => {
        const listItemparams = [x.id, x.name, x.qty, shoppingListId];
  
        sqlDb.transaction(tx => {
          tx.executeSql(listItemQuery, listItemparams, (tx, results) => {
            // console.log("listItem results",results);
            // Alert.alert('Success', 'item was saved.');
            console.log('Success', 'item was saved.');
          },
            (tx, err) => {
              // Alert.alert('Error', 'item were not saved.');
              console.log('Inserting into listItem table error', err, tx)
            });
        });
      });  
    });
  
}
