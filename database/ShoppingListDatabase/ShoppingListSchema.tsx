import React from 'react';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

 //create database
 export const db = SQLite.openDatabase('ShoppingList.db');


export const createDBTables = () => {
    //create tables in the database if they do not exist
    const db = SQLite.openDatabase('ShoppingList2.db');
    db.transaction(tx => {
      tx.executeSql("PRAGMA foreign_keys=on");
      tx.executeSql(`create table if not exists ShoppingLists (id 
          integer not null primary key autoincrement, 
          title nvarchar(50) null,
          items nvarchar(1000) null,
          qty nvarchar(1000) null,
          mealId integer default 0 not null,
          foreign key(mealId) references Meals(mealId) )`);

      tx.executeSql(`CREATE TABLE IF NOT EXISTS Meals
          (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          M_API_Id NVARCHAR(50) NULL,
          name NVARCHAR(50) NULL,
          igredientNames NVARCHAR(50) NULL,
          measurements NVARCHAR(250) NULL,
          instructions NVARCHAR(1000) NULL,
          category NVARCHAR(250) NULL,
          area NVARCHAR(250) NULL,
          tags NVARCHAR(250) NULL,
          youTube_Link NVARCHAR(250) NULL,
          image NVARCHAR(250) NULL)`);
    })
    console.log("Database tables has been created")
}

//add to shoppingList table
export const insertShoppingList = (title: string, items: string,qty: string, mealId: any) => new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('ShoppingList.db');
    const query = "insert into ShoppingLists (title, items, qty, mealId) values (?,?,?,?)";
    const params = [title, items, qty, mealId];

    db.transaction(tx => {
        tx.executeSql(query,params, (tx, results) => {
            console.log(results);
            Alert.alert('Success', 'Shopping List was saved.');
        },
        (tx, err) => {
            Alert.alert('Warning', 'Shopping List was not saved.');
            console.log('Inserting into shopping list table error',err)
        });
        // tx.executeSql("select * from [ShoppingList]", [], (_: any, { rows: { _array } }: any) => {
        //     if (_array) {
        //         resolve(_array);
        //     } else {
        //         reject("Error in insert method.");
        //     }
        // })
    });
});

//     return (
//         <div>

//         </div>
//     )
// }
