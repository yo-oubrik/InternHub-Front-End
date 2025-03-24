import { Row } from "@tanstack/react-table";

export const sortDateColumn = (rowA: Row<any>, rowB: Row<any>, columnId: string) => {
    const dateA = new Date(rowA.getValue(columnId)).getTime();
    const dateB = new Date(rowB.getValue(columnId)).getTime();
    return dateA - dateB;
}