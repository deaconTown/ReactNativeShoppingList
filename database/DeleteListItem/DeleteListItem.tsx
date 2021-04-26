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
    // deleteSingleListItem = (id: string) => new Promise((resolve, reject) => {
    //     const sqlDb = SQLite.openDatabase(
    //         {
    //             name: 'ShoppingList.db',
    //             location: 'default',
    //             createFromLocation: 2,
    //         },
    //         () => {
    //             // Alert.alert('Connected with success!');
    //             console.log("DB connected");
    //         },
    //         (error: any) => {
    //             console.log("deleteSingleListItem db error", error);
    //         }
    //     );

    //     // const query = "DELETE FROM ListItem WHERE id = ?";
    //     const query = 'DELETE FROM ListItem WHERE id = ?';

    //     const params = [id];

    //     sqlDb.transaction(tx => {
    //         tx.executeSql(query, params, (tx, results) => {
    //             console.log("record successfully deleted from ListItem table");
    //             Alert.alert('Success', 'Item was deleted.');
    //         },
    //             (tx, err) => {
    //                 // Alert.alert('Error', 'Shopping List was not saved.');
    //                 console.log('Issue deleting record from ListItem table', err, tx)
    //             });
    //     });
    // });
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
        dbConnectTrans?: string,
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
                console.log("DB connected " + dbConnectTrans);
            },
            (error: any) => {
                console.log(dbFailedToConnectMsg, error);
            }
        );
        sqlDb.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
                console.log(successMsg);
                Alert.alert('Success', clientSuccessMsg);
            },
                (error) => {
                    reject(error);
                    console.log(failuresMsg, error, trans)
                });
        });
    });

    async DeleteItemFromListQuery(id: string) {
        const query = 'DELETE FROM ListItem WHERE id = ?';
        const params = [id];
        this.ExecuteQuery(
            query,
            params,
            "record successfully deleted from ListItem table",
            'Item was deleted.',
            'Issue deleting record from ListItem table',
            '',
            'Delete List Item',
            'Failed to connect to DB when deleting record from ListItem table'
        );
    }
}
