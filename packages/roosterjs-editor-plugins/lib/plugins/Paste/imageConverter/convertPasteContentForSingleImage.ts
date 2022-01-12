import { BeforePasteEvent, TrustedHTMLHandler } from 'roosterjs-editor-types';
import { moveChildNodes, safeInstanceOf } from 'roosterjs-editor-dom';

/**
 * @internal
 * Convert pasted content if there are HTML and Image data in the Clipboard
 * @param event The BeforePaste event
 */
export default function convertPasteContentForSingleImage(
    event: BeforePasteEvent,
    trustedHTMLHandler: TrustedHTMLHandler
) {
    const { fragment, clipboardData } = event;
    const { html, image } = clipboardData;

    if (html && image) {
        //If there are Html in the clipboard, and the html body only have one img children, use the HTML
        const doc = new DOMParser().parseFromString(trustedHTMLHandler(html), 'text/html');
        if (
            safeInstanceOf(doc.body.firstChild, 'HTMLImageElement') &&
            safeInstanceOf(fragment.firstChild, 'HTMLImageElement') &&
            doc.body.firstChild.src != fragment.firstChild.src
        ) {
            doc.body.firstChild.src = fragment.firstChild.src;
        }

        moveChildNodes(fragment, doc?.body);
    }
}
