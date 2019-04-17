import EditorCore, { AttachDomEvent } from '../interfaces/EditorCore';
import isCharacterValue from '../eventApi/isCharacterValue';
import { PluginDomEvent, PluginEventType } from 'roosterjs-editor-types';

const attachDomEvent: AttachDomEvent = (
    core: EditorCore,
    eventName: string,
    pluginEventType?: PluginEventType,
    beforeDispatch?: (event: UIEvent) => void
) => {
    let onEvent = (event: UIEvent) => {
        // Stop propagation of a printable keyboard event (a keyboard event which is caused by printable char input).
        if (
            (isKeyboardEvent(event) && isCharacterValue(event)) ||
            pluginEventType == PluginEventType.Input
        ) {
            event.stopPropagation();
        }

        if (beforeDispatch) {
            beforeDispatch(event);
        }
        if (pluginEventType != null) {
            core.api.triggerEvent(
                core,
                <PluginDomEvent>{
                    eventType: pluginEventType,
                    rawEvent: event,
                },
                false /*broadcast*/
            );
        }
    };
    core.contentDiv.addEventListener(eventName, onEvent);
    return () => {
        core.contentDiv.removeEventListener(eventName, onEvent);
    };
};

export default attachDomEvent;

function isKeyboardEvent(e: UIEvent): e is KeyboardEvent {
    return e.type == 'keydown' || e.type == 'keypress' || e.type == 'keyup';
}