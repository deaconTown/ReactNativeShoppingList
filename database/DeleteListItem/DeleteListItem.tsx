import * as React from "react";
import { Alert } from "react-native";
import SQLite from 'react-native-sqlite-storage';

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class DeleteListItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    //function to delete a single record from the ListItem table
    deleteSingleListItem = (id: string) => new Promise((resolve, reject) => {
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
                console.log("deleteSingleListItem db error", error);
            }
        );

        const query = "DELETE FROM ListItem WHERE id = ?'";

        const params = [id];

        sqlDb.transaction(tx => {
            tx.executeSql(query, params, (tx, results) => {
                console.log("record successfully deleted from ListItem table");
                Alert.alert('Success', 'Item was deleted.');
            },
                (tx, err) => {
                    // Alert.alert('Error', 'Shopping List was not saved.');
                    console.log('Issue deleting record from ListItem table', err, tx)
                });
        });
    });
    //end of deleteSingleListItem

    /**
* Execute sql queries
* 
* @param sql
* @param params
* 
* @returns {resolve} results
*/
    ExecuteQuery = (
        sql: string,
        params: any[],
        successMsg?: string,
        clientSuccessMsg?: string,
        failuresMsg?: string,
        clientFailureSuccessMsg?: string,
        dbConnectMsg?: string,
        dbFailedToConnectMsg?: string

    ) => new Promise((resolve, reject) => {
        //   ExecuteQuery = (sql: string, params : any[]) => new Promise((resolve, reject) => {
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
                console.log("deleteSingleListItem db error", error);
            }
        );
        sqlDb.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

    async DeleteQuery(id: string) {
        const query = "DELETE FROM ListItem WHERE id = ?'";
        const params = [id];
        await this.ExecuteQuery(query, params);
    }
}
