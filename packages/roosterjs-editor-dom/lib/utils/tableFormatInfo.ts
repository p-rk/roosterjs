import { TableBorderFormat, TableFormat } from 'roosterjs-editor-types';

const TABLE_STYLE_INFO = 'roosterTableInfo';
const DEFAULT_FORMAT: TableFormat = {
    topBorderColor: '#ABABAB',
    bottomBorderColor: '#ABABAB',
    verticalBorderColor: '#ABABAB',
    hasHeaderRow: false,
    hasFirstColumn: false,
    hasBandedRows: false,
    hasBandedColumns: false,
    bgColorEven: null,
    bgColorOdd: '#ABABAB20',
    headerRowColor: '#ABABAB',
    tableBorderFormat: TableBorderFormat.DEFAULT,
};

/**
 * @internal
 * Get the format info of a table
 * If the table does not have a info saved, it will be retrieved from the css styles
 * @param table The table that has the info
 */
export function getTableFormatInfo(table: HTMLTableElement) {
    if (!table) {
        return;
    }
    const obj = safeParseJSON(table.dataset[TABLE_STYLE_INFO]) as TableFormat;
    return checkIfTableFormatIsValid(obj) ? obj : DEFAULT_FORMAT;
}

function checkIfTableFormatIsValid(format: TableFormat) {
    if (!format) {
        return false;
    }
    const {
        topBorderColor,
        verticalBorderColor,
        bottomBorderColor,
        bgColorOdd,
        bgColorEven,
        hasBandedColumns,
        hasBandedRows,
        hasFirstColumn,
        hasHeaderRow,
        tableBorderFormat,
    } = format;
    const colorsValues = [
        topBorderColor,
        verticalBorderColor,
        bottomBorderColor,
        bgColorOdd,
        bgColorEven,
    ];
    const stateValues = [hasBandedColumns, hasBandedRows, hasFirstColumn, hasHeaderRow];

    if (
        colorsValues.some(key => !isAValidColor(key)) ||
        stateValues.some(key => !isBoolean(key)) ||
        !isAValidTableBorderType(tableBorderFormat)
    ) {
        return false;
    }

    return true;
}

function isAValidColor(color: any) {
    if (color === null || color === undefined || typeof color === 'string') {
        return true;
    }
    return false;
}

function isBoolean(a: any) {
    if (typeof a === 'boolean') {
        return true;
    }
    return false;
}

function isAValidTableBorderType(border: TableBorderFormat) {
    if (-1 < border && border < 8) {
        return true;
    }
    return false;
}

function safeParseJSON(json: string): any {
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

/**
 * @internal
 * Save the format info of a table
 * @param table The table the info will be saved
 * @param format The format of the table
 */
export function saveTableInfo(table: HTMLTableElement, format: TableFormat) {
    if (checkIfItIsDefault(format)) {
        return;
    }
    if (table && format) {
        table.dataset[TABLE_STYLE_INFO] = JSON.stringify(format);
    }
}

function checkIfItIsDefault(format: TableFormat) {
    const formatKeys = Object.keys(format) as Array<keyof TableFormat>;
    return formatKeys.every(key => format[key] === DEFAULT_FORMAT[key]);
}
