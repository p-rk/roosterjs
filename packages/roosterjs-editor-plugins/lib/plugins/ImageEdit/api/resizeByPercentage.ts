import applyChange from '../editInfoUtils/applyChange';
import getEditInfoFromImage from '../editInfoUtils/getEditInfoFromImage';
import getTargetSizeByPercentage from '../editInfoUtils/getTargetSizeByPercentage';
import isResizedTo from './isResizedTo';
import { ChangeSource, IEditor } from 'roosterjs-editor-types';

/**
 * Resize the image by percentage of its natural size. If the image is cropped or rotated,
 * the final size will also calculated with crop and rotate info.
 * @param editor The editor that contains the image
 * @param image The image to resize
 * @param percentage Percentage to resize to
 * @param minWidth Minimum width
 * @param minHeight Minimum height
 */
export default function resizeByPercentage(
    editor: IEditor,
    image: HTMLImageElement,
    percentage: number,
    minWidth: number,
    minHeight: number
) {
    const editInfo = getEditInfoFromImage(image);

    if (!isResizedTo(image, percentage)) {
        loadImage(editInfo.src, shadowImage => {
            if (!editor.isDisposed() && editor.contains(image)) {
                const lastSrc = image.src;
                const { width, height } = getTargetSizeByPercentage(editInfo, percentage);
                editInfo.widthPx = Math.max(width, minWidth);
                editInfo.heightPx = Math.max(height, minHeight);

                editor.addUndoSnapshot(() => {
                    applyChange(editor, image, shadowImage, editInfo, lastSrc);
                }, ChangeSource.ImageResize);
            }
        });
    }
}

function loadImage(src: string, callback: (img: HTMLImageElement) => void) {
    const img = document.createElement('img');
    img.onload = () => {
        img.onload = null;
        img.onerror = null;
        callback(img);
    };
    img.onerror = () => {
        img.onload = null;
        img.onerror = null;
        callback(img);
    };
    img.src = src;
}
