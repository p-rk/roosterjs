import applyInlineStyle from '../utils/applyInlineStyle';
import { Editor } from 'roosterjs-editor-core';
import { ModeIndependentColor } from 'roosterjs-editor-types';

/**
 * Set text color at selection
 * @param editor The editor instance
 * @param color One of two options:
 * The color string, can be any of the predefined color names (e.g, 'red')
 * or hexadecimal color string (e.g, '#FF0000') or rgb value (e.g, 'rgb(255, 0, 0)') supported by browser.
 * Currently there's no validation to the string, if the passed string is invalid, it won't take affect
 * Alternatively, you can pass a @typedef ModeIndepenentColor. If in light mode, the lightModeColor property will be used.
 * If in dark mode, the darkModeColor will be used and the lightModeColor will be set as the ogsc.
 */
export default function setTextColor(editor: Editor, color: string | ModeIndependentColor) {
    if (typeof color === 'string') {
        const trimmedColor = color.trim();
        applyInlineStyle(editor, element => { element.style.color = trimmedColor });
    } else {
        const darkMode =editor.isDarkMode();
        const appliedColor =  darkMode ? color.darkModeColor : color.lightModeColor;
        applyInlineStyle(editor, (element) => {
            element.style.color = appliedColor;
            if (darkMode) {
                element.dataset.ogsc = color.lightModeColor;
            }
        });
    }

}
