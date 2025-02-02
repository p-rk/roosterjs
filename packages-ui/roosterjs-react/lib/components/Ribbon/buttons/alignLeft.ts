import RibbonButton from '../../../plugins/RibbonPlugin/RibbonButton';
import { Alignment } from 'roosterjs-editor-types';
import { setAlignment } from 'roosterjs-editor-api';

/**
 * Key of localized strings of Align left button
 */
export type AlignLeftButtonStringKey = 'buttonNameAlignLeft';

/**
 * "Align left" button on the format ribbon
 */
export const alignLeft: RibbonButton<AlignLeftButtonStringKey> = {
    key: 'buttonNameAlignLeft',
    unlocalizedText: 'Align left',
    iconName: 'AlignLeft',
    onClick: editor => {
        setAlignment(editor, Alignment.Left);
    },
};
