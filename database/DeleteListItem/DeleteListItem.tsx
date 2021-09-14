import * as React from "react";
import { Alert } from "react-native";
import SQLite from 'react-native-sqlite-storage';
import ExecuteQuery from "../ExecuteQuery/ExecuteQuery";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class DeleteListItem extends React.Component<Props, State> {
    ExecuteQuery: ExecuteQuery = new ExecuteQuery(this.props);

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



    async DeleteItemFromListQuery(id: string, alert?: boolean) {
        console.log("Removing listItem with id: " + id)

        const query = 'DELETE FROM ListItem WHERE id = ?';
        const params = [id];
        this.ExecuteQuery.ExecuteQuery(
            query,
            params,
            "Record successfully deleted from ListItem table",
            'Item was deleted.',
            'Issue deleting record from ListItem table',
            '',
            'Delete List Item',
            'Failed to connect to DB when deleting record from ListItem table',
            alert
        );
    }

    async DeleteShoppingListQuery(id: string, listContent?: ContentModel[]) {
        console.log("Removing shoppingList with id: " + id)

        const query = 'DELETE FROM ShoppingList WHERE id = ?';
        const params = [id];
        this.ExecuteQuery.ExecuteQuery(
            query,
            params,
            "Record successfully deleted from ShoppingList table",
            'Shopping list was deleted.',
            'Issue deleting record from ShoppingList table',
            '',
            'Delete Shopping List',
            'Failed to connect to DB when deleting record from ShoppingList table',
            true
        );



        console.log("Removing all listItems associated with shoppingList with id: " + id)

        //getting all list items associated with selected shoppingList
        let filteredListContent = listContent?.filter((x) => x.shoppingListId == id);

        if (filteredListContent) {
            filteredListContent.forEach(element => {
                this.DeleteItemFromListQuery(element.id, false);
            });
        }


    }
}
