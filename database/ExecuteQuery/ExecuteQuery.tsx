import * as React from "react";
import { Alert } from "react-native";
import SQLite from 'react-native-sqlite-storage';

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class ExecuteQuery extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

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
}
