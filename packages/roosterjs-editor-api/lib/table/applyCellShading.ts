import { ChangeSource, IEditor, ModeIndependentColor } from 'roosterjs-editor-types';
import { safeInstanceOf, setColor } from 'roosterjs-editor-dom';

/**
 * Set background color of cells.
 * @param editor The editor instance
 * @param color One of two options:
 **/
export default function applyCellShading(editor: IEditor, color: string | ModeIndependentColor) {
    editor.focus();
    editor.addUndoSnapshot(() => {
        const regions = editor.getSelectedRegions();
        regions.forEach(region => {
            if (safeInstanceOf(region.rootNode, 'HTMLTableCellElement')) {
                setColor(region.rootNode, color, true /* isBackgroundColor */, editor.isDarkMode());
            }
        });
    }, ChangeSource.Format);
}