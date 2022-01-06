import * as TestHelper from '../TestHelper';
import { IEditor } from 'roosterjs-editor-types';

const TABLE_SELECTOR_LENGTH = 12;
describe('TableSelectionPlugin', () => {
    let editor: IEditor;
    let id = 'tableSelectionContainerId';
    let targetId = 'tableSelectionTestId';
    let targetId2 = 'tableSelectionTestId2';
    let eventMap: Record<string, (event: Event) => void>;

    beforeEach(() => {
        editor = TestHelper.initEditor(id);
    });

    afterEach(() => {
        editor.dispose();
        editor = null;
        const div = document.getElementById(id);
        div.parentNode.removeChild(div);
    });

    function runTest(content: string, result: string, rangeCollapsed: boolean) {
        editor.setContent(content);
        const target = document.getElementById(targetId);
        const target2 = document.getElementById(targetId2);
        editor.focus();
        editor.select(target);
        simulateMouseEvent('mousedown', target);
        simulateMouseEvent('mousemove', target2);
        simulateMouseEvent('mousemove', target2);
        simulateMouseEvent('mouseup', target2);
        expect(editor.getScrollContainer().innerHTML).toBe(result);
        expect(editor.getSelectionRange().collapsed).toBe(rangeCollapsed);

        if (editor.getScrollContainer().innerHTML != result) {
            console.log(editor.getScrollContainer().innerHTML);
        }
    }

    it('Selection inside of table 1', () => {
        runTest(
            `<table><tr ><td id=${targetId}>a</td><td id=${targetId2}>w</td></tr></table>`,
            '<table class="_tableSelected"><tbody><tr><td id="tableSelectionTestId" data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">a</td><td id="tableSelectionTestId2" data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">w</td></tr></tbody></table>',
            true
        );

        runTest(
            `<div><br></div><div><table cellspacing="0" cellpadding="1" style="border-collapse: collapse;"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id=${targetId} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);">fsad fasd</td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id=${targetId2} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>`,
            '<div><br></div><div><table style="border-collapse: collapse;" class="_tableSelected" cellspacing="0" cellpadding="1"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id="tableSelectionTestId" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected">fsad fasd</td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td id="tableSelectionTestId2" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>',
            true
        );
    });

    it('Selection inside of table 2', () => {
        runTest(
            `<div><br></div><div><table cellspacing="0" cellpadding="1" style="border-collapse: collapse;"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id=${targetId} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);">fsad fasd</td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id=${targetId2} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>`,
            '<div><br></div><div><table style="border-collapse: collapse;" class="_tableSelected" cellspacing="0" cellpadding="1"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td id="tableSelectionTestId" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected">fsad fasd</td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td id="tableSelectionTestId2" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="" class="_tableCellSelected"><br></td><td style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>',
            true
        );
    });

    it('Selection inside of table with table with color 1', () => {
        runTest(
            `<table><tr ><td style="background-color: rgba(35, 35, 35);"  id=${targetId}>a</td><td style="background-color: rgba(35, 35, 35);" id=${targetId2}>w</td></tr></table>`,
            '<table class="_tableSelected"><tbody><tr><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected">a</td><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId2" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected">w</td></tr></tbody></table>',
            true
        );

        runTest(
            `<div><br></div><div><table cellspacing="0" cellpadding="1" style="border-collapse: collapse;"><tbody><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   id=${targetId} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);">fsad fasd</td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   id=${targetId2} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>`,
            '<div><br></div><div><table style="border-collapse: collapse;" class="_tableSelected" cellspacing="0" cellpadding="1"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected">fsad fasd</td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId2" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr></tbody></table></div><div><br></div>',
            true
        );
    });

    it('Selection inside of table with table with color 2', () => {
        runTest(
            `<div><br></div><div><table cellspacing="0" cellpadding="1" style="border-collapse: collapse;"><tbody><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   id=${targetId} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);">fsad fasd</td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   id=${targetId2} style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td><td  style="background-color: rgba(35, 35, 35);"   style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);"><br></td></tr></tbody></table></div><div><br></div>`,
            '<div><br></div><div><table style="border-collapse: collapse;" class="_tableSelected" cellspacing="0" cellpadding="1"><tbody><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected">fsad fasd</td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td style="background-color: rgba(35, 35, 35);"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(198, 198, 198, 0.7);" id="tableSelectionTestId2" data-original-background-color="rgb(35,  35,  35)" class="_tableCellSelected"><br></td><td style="background-color: rgba(35, 35, 35);"><br></td></tr></tbody></table></div><div><br></div>',
            true
        );
    });

    it('Selection outside of table 1', () => {
        runTest(
            `<div  id=${targetId}>asd</div><div><table><tr ><td>a</td><td id=${targetId2}>w</td></tr></table></div>`,
            '<div id="tableSelectionTestId">asd</div><div><table class="_tableSelected"><tbody><tr><td data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">a</td><td id="tableSelectionTestId2" data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">w</td></tr></tbody></table></div>',
            false
        );
    });

    it('Selection outside of table 2', () => {
        runTest(
            `<div  id=${targetId}>asd</div><div><table><tr ><td id=${targetId2}>a</td><td >w</td></tr></table></div>`,
            '<div id="tableSelectionTestId">asd</div><div><table class="_tableSelected"><tbody><tr><td id="tableSelectionTestId2" data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">a</td><td data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">w</td></tr></tbody></table></div>',
            false
        );
    });

    it('Selection outside of table 3', () => {
        runTest(
            `<div id=${targetId}>asd</div><div><table><tr ><td id=${targetId2}>a</td><td >w</td></tr><tr ><td >a</td><td >w</td></tr></table></div>`,
            '<div id="tableSelectionTestId">asd</div><div><table class="_tableSelected"><tbody><tr><td id="tableSelectionTestId2" data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">a</td><td data-original-background-color="" style="background-color: rgba(198, 198, 198, 0.7);" class="_tableCellSelected">w</td></tr><tr><td>a</td><td>w</td></tr></tbody></table></div>',
            false
        );
    });

    it('tableSelector display on mouse move inside table', () => {
        editor.setContent(
            `<table id='table1'><tr ><td id=${targetId}>a</td><td id=${targetId2}>w</td></tr></table>`
        );
        const target = document.getElementById(targetId);
        const target2 = document.getElementById(targetId2);
        editor.focus();
        editor.select(target);
        simulateMouseEvent('mousemove', target2);

        const tableSelector = editor.getDocument().getElementById('tableSelector');
        const table = editor.getDocument().getElementById('table1');

        const rect = table.getBoundingClientRect();

        expect(tableSelector).toBeDefined();
        expect(tableSelector.style.display).toBe('unset');
        expect(tableSelector.style.top).toBe(`${rect.top - TABLE_SELECTOR_LENGTH}px`);
        expect(tableSelector.style.left).toBe(`${rect.left - TABLE_SELECTOR_LENGTH - 2}px`);
    });

    it('tableSelector before moving to a table and moving to a table', () => {
        editor.setContent(
            `<div id=${targetId}><table id='table1'><tr ><td >a</td><td>w</td></tr></table>`
        );
        const target = document.getElementById(targetId);
        simulateMouseEvent('mousemove', target);

        let tableSelector = editor.getDocument().getElementById('tableSelector');
        expect(tableSelector).toBe(null);

        const target2 = document.getElementById('table1');
        tableSelector = editor.getDocument().getElementById('tableSelector');
        simulateMouseEvent('mousemove', target2);
        expect(tableSelector).toBeDefined();
    });

    it('tableSelector on click event', () => {
        editor.setContent(`<div ><table id=${targetId}><tr ><td >a</td><td>w</td></tr></table>`);
        const target = document.getElementById(targetId);
        simulateMouseEvent('mousemove', target);

        let tableSelector = editor.getDocument().getElementById('tableSelector');
        simulateMouseEvent('click', tableSelector);

        expect(tableSelector).toBeDefined();
        expect(editor.getContent()).toBe(
            '<div><table id="tableSelectionTestId" class=""><tbody><tr><td style="" class="_tableCellSelected" data-on-focus-cache="onBlur" data-original-background-color="">a</td><td style="" class="_tableCellSelected" data-on-focus-cache="onBlur" data-original-background-color="">w</td></tr></tbody></table></div>'
        );
    });

    it('handle ExtractContent', () => {
        editor.setContent(
            '<div><br></div><div><table class="_tableSelected" style="border-collapse: collapse;" cellpadding="1" cellspacing="0"><tbody><tr style="background-color: rgb(255, 255, 255);"><td class="_tableCellSelected" data-original-background-color="" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);"><br></td><td class="_tableCellSelected" data-original-background-color="" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);"><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td class="_tableCellSelected" data-original-background-color="" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);"><br></td><td class="_tableCellSelected" data-original-background-color="" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); background-color: rgba(198, 198, 198, 0.7);"><br></td></tr></tbody></table></div><div><br></div>'
        );

        expect(editor.getContent()).toBe(
            '<div><br></div><div><table class="" style="border-collapse: collapse;" cellspacing="0" cellpadding="1"><tbody><tr style="background-color: rgb(255, 255, 255);"><td class="_tableCellSelected" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);" data-on-focus-cache="onBlur" data-original-background-color=""><br></td><td class="_tableCellSelected" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);" data-on-focus-cache="onBlur" data-original-background-color=""><br></td></tr><tr style="background-color: rgb(255, 255, 255);"><td class="_tableCellSelected" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);" data-on-focus-cache="onBlur" data-original-background-color=""><br></td><td class="_tableCellSelected" style="width: 120px; border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);" data-on-focus-cache="onBlur" data-original-background-color=""><br></td></tr></tbody></table></div><div><br></div>'
        );
    });
});

function simulateMouseEvent(type: string, target: HTMLElement, point?: { x: number; y: number }) {
    const rect = target.getBoundingClientRect();
    var event = new MouseEvent(type, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + (point != undefined ? point?.x : 0),
        clientY: rect.top + (point != undefined ? point?.y : 0),
    });
    target.dispatchEvent(event);
}
